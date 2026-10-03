// Tactile Haptic Vibration Engine for Horological Interactions
// Zero sound effects, silent physical tactile feedback on supported devices

class HorologyHapticEngine {
  public isMuted: boolean = false;

  private vibrate(pattern: number | number[]) {
    try {
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
    } catch {
      // Ignore if unsupported
    }
  }

  public playBezelClick() {
    this.vibrate(8); // Subtle 8ms mechanical notch click
  }

  public playMarkerSelect() {
    this.vibrate(15); // Crisp 15ms marker engagement pulse
  }

  public playCrownPull() {
    this.vibrate([20, 30, 20]); // Double tactile click for crown pull
  }

  public playFlip() {
    this.vibrate([15, 20, 15]); // Smooth rotational caseback flip vibration
  }
}

export const horologyAudio = new HorologyHapticEngine();

