import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  X, 
  Rotate3d, 
  Eye, 
  Check, 
  Armchair, 
  Sparkles, 
  Info, 
  CreditCard, 
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { Cinema, Movie, ShowtimeSlot, BookingSeat } from '../types/cinema';
import { BookingService } from '../services/bookingService';

interface CinemaSeat3DProps {
  cinema: Cinema;
  movie: Movie;
  showtime: ShowtimeSlot;
  onClose: () => void;
  onProceedToCheckout: (seats: BookingSeat[]) => void;
}

export const CinemaSeat3D: React.FC<CinemaSeat3DProps> = ({
  cinema,
  movie,
  showtime,
  onClose,
  onProceedToCheckout
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [seatsData, setSeatsData] = useState<BookingSeat[]>([]);
  const [hoveredSeat, setHoveredSeat] = useState<BookingSeat | null>(null);
  const [cameraView, setCameraView] = useState<'front' | 'overview' | 'balcony'>('overview');

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const seatMeshesMap = useRef<Map<string, THREE.Mesh>>(new Map());
  const reqAnimationRef = useRef<number>(0);

  // Initialize seat data
  useEffect(() => {
    const generated = BookingService.generateAuditoriumLayout(cinema, showtime);
    setSeatsData(generated);
  }, [cinema, showtime]);

  // Three.js Scene Setup & Render Loop
  useEffect(() => {
    if (!mountRef.current || seatsData.length === 0) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070a13);
    scene.fog = new THREE.FogExp2(0x070a13, 0.025);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 10, 16);
    camera.lookAt(0, 1.5, -4);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;
    mountRef.current.replaceChildren(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Projector Beam Spotlight hitting the curved screen
    const screenSpotlight = new THREE.SpotLight(0x38bdf8, 3.5, 30, Math.PI / 4, 0.5, 1);
    screenSpotlight.position.set(0, 8, 12);
    screenSpotlight.target.position.set(0, 2, -10);
    scene.add(screenSpotlight);
    scene.add(screenSpotlight.target);

    // Warm auditorium side aisle glows
    const leftAisleLight = new THREE.PointLight(0xf59e0b, 1.5, 20);
    leftAisleLight.position.set(-8, 3, 2);
    scene.add(leftAisleLight);

    const rightAisleLight = new THREE.PointLight(0xf59e0b, 1.5, 20);
    rightAisleLight.position.set(8, 3, 2);
    scene.add(rightAisleLight);

    // 5. Curved Movie Screen
    const screenGeo = new THREE.CylinderGeometry(14, 14, 6, 32, 1, true, -Math.PI / 5, (2 * Math.PI) / 5);
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Draw screen preview with title
      const grad = ctx.createLinearGradient(0, 0, 512, 256);
      grad.addColorStop(0, '#0c1a30');
      grad.addColorStop(0.5, '#1e3a8a');
      grad.addColorStop(1, '#0c1a30');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 256);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(movie.title.toUpperCase(), 256, 120);

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(`CINESPHERE 3D • ${showtime.screenName}`, 256, 160);
    }
    const screenTexture = new THREE.CanvasTexture(canvas);
    const screenMat = new THREE.MeshBasicMaterial({ 
      map: screenTexture, 
      side: THREE.DoubleSide 
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 3.2, -10);
    screenMesh.rotation.y = Math.PI;
    scene.add(screenMesh);

    // "SCREEN THIS WAY" Text Banner Bar
    const barGeo = new THREE.BoxGeometry(10, 0.3, 0.2);
    const barMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7 });
    const screenBar = new THREE.Mesh(barGeo, barMat);
    screenBar.position.set(0, 0.2, -7.5);
    scene.add(screenBar);

    // 6. Auditorium Floor (Tiered stepped slope)
    const floorGeo = new THREE.PlaneGeometry(26, 26);
    const floorMat = new THREE.MeshStandardMaterial({ 
      color: 0x090d16, 
      roughness: 0.9, 
      metalness: 0.1 
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2 + 0.12; // incline
    floor.position.set(0, 0, 2);
    scene.add(floor);

    // 7. Render 3D Seats
    seatMeshesMap.current.clear();
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'];
    const colsPerRow = 12;

    seatsData.forEach(seat => {
      const rowIndex = rows.indexOf(seat.row);
      const colIndex = seat.col - 1;

      // Position math for auditorium amphitheater curve
      const z = -4 + rowIndex * 1.35;
      const x = (colIndex - (colsPerRow - 1) / 2) * 1.05 + (colIndex > 5 ? 0.6 : -0.6); // aisle in middle
      const y = rowIndex * 0.42;

      // Seat geometry (Recliner is wider & plusher)
      const isRecliner = seat.tier === 'Recliner';
      const seatGeo = isRecliner 
        ? new THREE.BoxGeometry(0.85, 0.75, 0.75) 
        : new THREE.BoxGeometry(0.65, 0.65, 0.55);

      // Color mapping
      let seatColor = 0x334155; // available classic slate
      if (seat.status === 'reserved') {
        seatColor = 0x1f242e; // muted gray reserved
      } else if (selectedSeatIds.includes(seat.id)) {
        seatColor = 0x10b981; // selected emerald green
      } else if (seat.tier === 'Recliner') {
        seatColor = 0xb45309; // recliner luxury amber
      } else if (seat.tier === 'Prime') {
        seatColor = 0x0284c7; // prime cyan
      }

      const seatMat = new THREE.MeshStandardMaterial({
        color: seatColor,
        roughness: isRecliner ? 0.3 : 0.7,
        metalness: isRecliner ? 0.4 : 0.1,
      });

      const seatMesh = new THREE.Mesh(seatGeo, seatMat);
      seatMesh.position.set(x, y + 0.4, z);
      seatMesh.userData = { seatId: seat.id, seat };
      scene.add(seatMesh);

      seatMeshesMap.current.set(seat.id, seatMesh);
    });

    // 8. Raycasting & Interactive Click Handling
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshes = Array.from(seatMeshesMap.current.values());
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object as THREE.Mesh;
        const seat = clickedMesh.userData.seat as BookingSeat;

        if (seat && seat.status !== 'reserved') {
          setSelectedSeatIds(prev => {
            if (prev.includes(seat.id)) {
              return prev.filter(id => id !== seat.id);
            } else {
              return [...prev, seat.id];
            }
          });
        }
      }
    };

    const handlePointerMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshes = Array.from(seatMeshesMap.current.values());
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const hoveredMesh = intersects[0].object as THREE.Mesh;
        setHoveredSeat(hoveredMesh.userData.seat as BookingSeat);
      } else {
        setHoveredSeat(null);
      }
    };

    const canvasElem = renderer.domElement;
    canvasElem.addEventListener('click', handlePointerDown);
    canvasElem.addEventListener('mousemove', handlePointerMove);

    // 9. Animation Loop with Gentle Camera Glide
    let angle = 0;
    const animate = () => {
      reqAnimationRef.current = requestAnimationFrame(animate);

      // Subtle projector pulse
      angle += 0.02;
      screenSpotlight.intensity = 3.2 + Math.sin(angle) * 0.4;

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const newW = mountRef.current.clientWidth;
      const newH = mountRef.current.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvasElem.removeEventListener('click', handlePointerDown);
      canvasElem.removeEventListener('mousemove', handlePointerMove);
      cancelAnimationFrame(reqAnimationRef.current);
      renderer.dispose();
    };
  }, [seatsData, selectedSeatIds, movie, showtime, cinema]);

  // Handle Camera Preset Switches
  const switchCameraView = (view: 'front' | 'overview' | 'balcony') => {
    setCameraView(view);
    const cam = cameraRef.current;
    if (!cam) return;

    if (view === 'front') {
      cam.position.set(0, 4.5, 4);
      cam.lookAt(0, 3, -10);
    } else if (view === 'balcony') {
      cam.position.set(0, 13, 14);
      cam.lookAt(0, 2, -6);
    } else {
      cam.position.set(0, 9, 13);
      cam.lookAt(0, 1.8, -4);
    }
  };

  // Selected seats objects
  const selectedSeats = seatsData.filter(s => selectedSeatIds.includes(s.id));
  const subtotal = selectedSeats.reduce((acc, s) => acc + s.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-6xl h-[94vh] bg-[#070A13] border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between text-white"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-[#0C111F]/90 backdrop-blur-md flex items-center justify-between gap-3 shrink-0 z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500 text-slate-950 font-black text-xs">3D</span>
              <h3 className="text-base sm:text-xl font-bold font-display text-white">
                {cinema.name} — Interactive 3D Seat Booking
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
              <span className="text-amber-400 font-semibold">{movie.title}</span>
              <span>•</span>
              <span>{showtime.time} ({showtime.language})</span>
              <span>•</span>
              <span className="text-cyan-400">{showtime.screenName}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Camera View Selectors */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl">
              <button
                onClick={() => switchCameraView('overview')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  cameraView === 'overview' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => switchCameraView('front')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  cameraView === 'front' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Screen View
              </button>
              <button
                onClick={() => switchCameraView('balcony')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  cameraView === 'balcony' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Balcony
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D WebGL Canvas Area */}
        <div className="relative flex-1 w-full h-full min-h-[300px] overflow-hidden">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Curved Screen Banner Overlay Indicator */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-cyan-500/40 text-[11px] text-cyan-300 font-bold uppercase tracking-widest pointer-events-none flex items-center gap-2 shadow-lg shadow-cyan-500/10">
            <span>CURVED 3D CINEMA SCREEN</span>
          </div>

          {/* Hovered Seat Tooltip */}
          {hoveredSeat && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-amber-500 text-xs text-white pointer-events-none shadow-xl flex items-center gap-2">
              <span className="font-bold text-amber-400">Seat {hoveredSeat.id}</span>
              <span>•</span>
              <span>{hoveredSeat.tier}</span>
              <span>•</span>
              <span className="font-semibold text-emerald-400">₹{hoveredSeat.price}</span>
              {hoveredSeat.status === 'reserved' && (
                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded">Reserved</span>
              )}
            </div>
          )}

          {/* Mobile Camera Switcher */}
          <div className="sm:hidden absolute top-4 left-4 flex gap-1 z-10">
            <button
              onClick={() => switchCameraView(cameraView === 'overview' ? 'front' : 'overview')}
              className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-slate-700 text-[11px] font-semibold text-slate-200"
            >
              Switch Angle
            </button>
          </div>
        </div>

        {/* Bottom Booking Summary & Legend Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#0C111F] z-10 space-y-3 shrink-0">
          {/* Seat Tiers Legend */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-4 text-[11px]">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded bg-slate-600 border border-slate-500" />
                <span className="text-slate-300">Classic (₹{showtime.basePrice})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded bg-sky-600 border border-sky-400" />
                <span className="text-slate-300">Prime (₹{Math.round(showtime.basePrice * 1.25)})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded bg-amber-600 border border-amber-400" />
                <span className="text-slate-300">Recliner (₹{showtime.reclinerPrice || Math.round(showtime.basePrice * 1.9)})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded bg-emerald-500 border border-emerald-300" />
                <span className="text-emerald-300 font-semibold">Selected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded bg-slate-900 border border-slate-800 opacity-60" />
                <span className="text-slate-500">Reserved</span>
              </div>
            </div>

            <div className="text-[11px] text-amber-300/80 hidden md:block">
              *Click 3D seats to select or change seats
            </div>
          </div>

          {/* Selected Seats Counter & Proceed CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
            <div>
              <div className="text-xs text-slate-400">
                Selected: {selectedSeats.length > 0 ? (
                  <span className="font-bold text-white ml-1">
                    {selectedSeats.map(s => s.id).join(', ')} ({selectedSeats.length} {selectedSeats.length === 1 ? 'seat' : 'seats'})
                  </span>
                ) : (
                  <span className="italic text-slate-500 ml-1">No seats chosen yet</span>
                )}
              </div>
              <div className="text-lg font-black text-amber-400 mt-0.5">
                ₹{subtotal.toLocaleString()} 
                <span className="text-xs font-normal text-slate-400 ml-1">
                  (Estimated base ticket price)
                </span>
              </div>
            </div>

            <button
              disabled={selectedSeats.length === 0}
              onClick={() => onProceedToCheckout(selectedSeats)}
              className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm transition shadow-lg ${
                selectedSeats.length > 0
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/25 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Proceed to Checkout</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
