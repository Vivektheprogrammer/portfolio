// Tactile Haptic Vibration & Synthesized Horological Sound Engine


class HorologyAudioEngine {
  public isMuted: boolean = false;
  private audioCtx: AudioContext | null = null;

  private initAudio() {
    if (this.audioCtx) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    } catch {
      // AudioContext unavailable
    }
  }

  private vibrate(pattern: number | number[]) {
    try {
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
    } catch {
      // Ignore if unsupported
    }
  }

  private playTone(freq: number, type: OscillatorType, duration: number, gainVal: number = 0.1) {
    if (this.isMuted) return;
    this.initAudio();
    if (!this.audioCtx) return;

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => { });
    }

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch {
      // Ignore audio synthesis errors
    }
  }

  public playBezelClick() {
    this.vibrate(8); // Subtle 8ms mechanical notch click
    this.playTone(1800, 'triangle', 0.02, 0.08);
  }

  public playMarkerSelect() {
    this.vibrate(15); // Crisp 15ms marker engagement pulse
    this.playTone(1200, 'sine', 0.06, 0.12);
  }

  public playCrownPull() {
    this.vibrate([20, 30, 25]); // Double tactile click for crown pull
    // Two-stage mechanical pull sound
    this.playTone(1400, 'square', 0.03, 0.12);
    setTimeout(() => {
      this.playTone(2200, 'sine', 0.05, 0.15);
    }, 40);
  }

  public playCrownPush() {
    this.vibrate([25, 20]);
    this.playTone(1100, 'square', 0.04, 0.14);
  }

  public playCrownRatchet() {
    this.vibrate(5);
    // Rapid crisp Swiss escapement tooth tick
    this.playTone(2400 + Math.random() * 400, 'triangle', 0.015, 0.06);
  }

  public playFlip() {
    this.vibrate([15, 20, 15]); // Smooth rotational caseback flip vibration
    this.playTone(600, 'sine', 0.1, 0.08);
  }
}

export const horologyAudio = new HorologyAudioEngine();

