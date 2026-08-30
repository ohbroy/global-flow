import { useEffect, useRef, useState } from "react";

/** Hub cities Skylink references on the network map. Editable. */
export const HUBS = [
  { id: "lagos", label: "Lagos", lat: 6.45, lon: 3.4 },
  { id: "london", label: "London", lat: 51.5, lon: -0.12 },
  { id: "rotterdam", label: "Rotterdam", lat: 51.92, lon: 4.48 },
  { id: "dubai", label: "Dubai", lat: 25.2, lon: 55.27 },
  { id: "singapore", label: "Singapore", lat: 1.35, lon: 103.82 },
  { id: "shanghai", label: "Shanghai", lat: 31.23, lon: 121.47 },
  { id: "newyork", label: "New York", lat: 40.71, lon: -74.01 },
  { id: "santos", label: "Santos", lat: -23.96, lon: -46.33 },
  { id: "durban", label: "Durban", lat: -29.86, lon: 31.02 },
  { id: "sydney", label: "Sydney", lat: -33.87, lon: 151.21 },
];

const LANES: [string, string][] = [
  ["lagos", "rotterdam"],
  ["lagos", "dubai"],
  ["rotterdam", "newyork"],
  ["dubai", "singapore"],
  ["singapore", "shanghai"],
  ["shanghai", "newyork"],
  ["lagos", "santos"],
  ["durban", "singapore"],
  ["singapore", "sydney"],
  ["london", "lagos"],
];

type Vec3 = { x: number; y: number; z: number };

function toVec(lat: number, lon: number): Vec3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return {
    x: -Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: Math.sin(phi) * Math.sin(theta),
  };
}

function rotate(v: Vec3, yaw: number, pitch: number): Vec3 {
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const x1 = v.x * cy - v.z * sy;
  const z1 = v.x * sy + v.z * cy;
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  return { x: x1, y: v.y * cp - z1 * sp, z: v.y * sp + z1 * cp };
}

function slerp(a: Vec3, b: Vec3, t: number): Vec3 {
  const dot = Math.min(1, Math.max(-1, a.x * b.x + a.y * b.y + a.z * b.z));
  const omega = Math.acos(dot);
  if (omega < 1e-6) return a;
  const s = Math.sin(omega);
  const k1 = Math.sin((1 - t) * omega) / s;
  const k2 = Math.sin(t * omega) / s;
  return { x: a.x * k1 + b.x * k2, y: a.y * k1 + b.y * k2, z: a.z * k1 + b.z * k2 };
}

/**
 * Interactive wireframe globe. Drag (mouse, touch or arrow keys) to spin it;
 * it idles with a slow auto-rotation and keeps momentum after a flick.
 */
export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = {
      yaw: 0.6,
      pitch: -0.28,
      vYaw: 0,
      vPitch: 0,
      dragging: false,
      lastX: 0,
      lastY: 0,
      t: 0,
    };

    let width = 0;
    let height = 0;
    let radius = 0;
    let frame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      radius = Math.min(width, height) * 0.42;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const project = (v: Vec3) => ({
      x: width / 2 + v.x * radius,
      y: height / 2 - v.y * radius,
      z: v.z,
    });

    const nodePositions = new Map<string, { x: number; y: number; z: number }>();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;

      // atmosphere
      const glow = ctx.createRadialGradient(cx, cy, radius * 0.6, cx, cy, radius * 1.35);
      glow.addColorStop(0, "rgba(90,160,255,0.16)");
      glow.addColorStop(1, "rgba(90,160,255,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // sphere body
      const body = ctx.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.4,
        radius * 0.1,
        cx,
        cy,
        radius,
      );
      body.addColorStop(0, "rgba(28,48,84,0.95)");
      body.addColorStop(1, "rgba(8,14,28,0.98)");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // graticule
      ctx.lineWidth = 1;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let started = false;
        for (let lon = -180; lon <= 180; lon += 4) {
          const p = project(rotate(toVec(lat, lon), state.yaw, state.pitch));
          if (p.z < 0) {
            started = false;
            continue;
          }
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = "rgba(150,190,255,0.16)";
        ctx.stroke();
      }
      for (let lon = -180; lon < 180; lon += 30) {
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 4) {
          const p = project(rotate(toVec(lat, lon), state.yaw, state.pitch));
          if (p.z < 0) {
            started = false;
            continue;
          }
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = "rgba(150,190,255,0.12)";
        ctx.stroke();
      }

      // rim
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(160,200,255,0.35)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // nodes
      nodePositions.clear();
      for (const hub of HUBS) {
        const p = project(rotate(toVec(hub.lat, hub.lon), state.yaw, state.pitch));
        nodePositions.set(hub.id, p);
        if (p.z < 0) continue;
        const alpha = 0.35 + p.z * 0.65;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120,190,255,${alpha})`;
        ctx.fill();
        const pulse = (Math.sin(state.t * 0.05 + hub.lat) + 1) / 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3 + pulse * 8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(120,190,255,${(1 - pulse) * 0.35 * alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // lanes + travelling pulses
      for (const [fromId, toId] of LANES) {
        const from = HUBS.find((h) => h.id === fromId);
        const to = HUBS.find((h) => h.id === toId);
        if (!from || !to) continue;
        const a = rotate(toVec(from.lat, from.lon), state.yaw, state.pitch);
        const b = rotate(toVec(to.lat, to.lon), state.yaw, state.pitch);

        ctx.beginPath();
        let started = false;
        for (let i = 0; i <= 48; i++) {
          const s = slerp(a, b, i / 48);
          const lift = 1 + 0.09 * Math.sin((i / 48) * Math.PI);
          const p = project({ x: s.x * lift, y: s.y * lift, z: s.z * lift });
          if (s.z < -0.05) {
            started = false;
            continue;
          }
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = "rgba(120,190,255,0.4)";
        ctx.lineWidth = 1;
        ctx.stroke();

        const tt = ((state.t * 0.004 + fromId.length * 0.13) % 1 + 1) % 1;
        const s = slerp(a, b, tt);
        const lift = 1 + 0.09 * Math.sin(tt * Math.PI);
        if (s.z > -0.05) {
          const p = project({ x: s.x * lift, y: s.y * lift, z: s.z * lift });
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(215,240,255,0.95)";
          ctx.fill();
        }
      }
    };

    const tick = () => {
      state.t += 1;
      if (!state.dragging) {
        state.yaw += 0.0016 + state.vYaw;
        state.pitch += state.vPitch;
        state.vYaw *= 0.94;
        state.vPitch *= 0.94;
      }
      state.pitch = Math.max(-1.1, Math.min(1.1, state.pitch));
      draw();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const pointerDown = (e: PointerEvent) => {
      state.dragging = true;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };
    const pointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let hover: string | null = null;
      for (const [id, p] of nodePositions) {
        if (p.z < 0) continue;
        if (Math.hypot(p.x - mx, p.y - my) < 14) hover = id;
      }
      setActive(hover);

      if (!state.dragging) return;
      const dx = e.clientX - state.lastX;
      const dy = e.clientY - state.lastY;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      state.yaw += dx * 0.005;
      state.pitch += dy * 0.004;
      state.vYaw = dx * 0.0012;
      state.vPitch = dy * 0.001;
    };
    const pointerUp = (e: PointerEvent) => {
      state.dragging = false;
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") state.yaw -= 0.12;
      if (e.key === "ArrowRight") state.yaw += 0.12;
      if (e.key === "ArrowUp") state.pitch -= 0.08;
      if (e.key === "ArrowDown") state.pitch += 0.08;
    };

    canvas.addEventListener("pointerdown", pointerDown);
    canvas.addEventListener("pointermove", pointerMove);
    canvas.addEventListener("pointerup", pointerUp);
    canvas.addEventListener("pointercancel", pointerUp);
    canvas.addEventListener("pointerleave", () => setActive(null));
    canvas.addEventListener("keydown", key);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerup", pointerUp);
      canvas.removeEventListener("pointercancel", pointerUp);
      canvas.removeEventListener("keydown", key);
    };
  }, []);

  const hub = HUBS.find((h) => h.id === active);

  return (
    <div className="relative aspect-square w-full">
      <canvas
        ref={canvasRef}
        tabIndex={0}
        role="img"
        aria-label="Interactive globe showing Skylink Global trade lanes. Drag or use arrow keys to spin."
        className="h-full w-full cursor-grab touch-none rounded-full outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-primary"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
        <span className="eyebrow text-[0.58rem] text-white/45">
          {hub ? hub.label : "Drag to spin"}
        </span>
      </div>
    </div>
  );
}
