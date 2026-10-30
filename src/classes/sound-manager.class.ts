const AUDIO_PATH = './assets/audio/';
const MUSIC_PATH = `${AUDIO_PATH}music/background.mp3`;
const MUSIC_VOLUME = 0.3;
const MUTE_STORAGE_KEY = 'valhallaRushMuted';

const SOUND_FILES = {
  swordSwing: { file: 'sword-swing.mp3', volume: 0.5 },
  swordHit: { file: 'sword-hit.mp3', volume: 0.6 },
  playerHurt: { file: 'player-hurt.mp3', volume: 0.6 },
  playerDeath: { file: 'player-death.mp3', volume: 0.6 },
  snore: { file: 'snore.mp3', volume: 0.4 },
  runePickup: { file: 'rune-pickup.mp3', volume: 0.6 },
  potionHeal: { file: 'potion-heal.mp3', volume: 0.5 },
  enemyHurt: { file: 'enemy-hurt.mp3', volume: 0.5 },
  enemyDeath: { file: 'enemy-death.mp3', volume: 0.6 },
  bossRoar: { file: 'boss-roar.mp3', volume: 0.7 },
  bossHurt: { file: 'boss-hurt.mp3', volume: 0.6 },
  bossDeath: { file: 'boss-death.mp3', volume: 0.7 },
  victory: { file: 'victory.mp3', volume: 0.6 },
  defeat: { file: 'defeat.mp3', volume: 0.6 },
};

export type SoundName = keyof typeof SOUND_FILES;

/**
 * Plays all sounds and the background music and remembers the mute state.
 */
export class SoundManager {
  sounds = {} as Record<SoundName, HTMLAudioElement>;
  music = new Audio(MUSIC_PATH);
  isMuted = SoundManager.loadMuted();
  isMusicWanted = false;

  constructor() {
    this.music.loop = true;
    this.music.volume = MUSIC_VOLUME;
    this.loadSounds();
  }


  /**
   * Creates one audio element per sound effect.
   *
   * @returns {void}
   */
  loadSounds(): void {
    Object.entries(SOUND_FILES).forEach(([name, { file, volume }]) => {
      const audio = new Audio(AUDIO_PATH + 'sfx/' + file);
      audio.volume = volume;
      this.sounds[name as SoundName] = audio;
    });
  }


  /**
   * Plays a sound effect from the beginning, unless sound is muted.
   *
   * @param {SoundName} name - Name of the sound.
   * @returns {void}
   */
  play(name: SoundName): void {
    if (this.isMuted) return;
    const sound = this.sounds[name];
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }


  /**
   * Starts the background music. It resumes automatically after unmuting.
   *
   * @returns {void}
   */
  startMusic(): void {
    this.isMusicWanted = true;
    this.music.currentTime = 0;
    if (!this.isMuted) this.music.play().catch(() => {});
  }


  /**
   * @returns {void}
   */
  stopMusic(): void {
    this.isMusicWanted = false;
    this.music.pause();
  }


  /**
   * Silences everything that is currently playing.
   *
   * @returns {void}
   */
  pauseAll(): void {
    this.music.pause();
    Object.values(this.sounds).forEach((sound) => sound.pause());
  }


  /**
   * Switches sound on or off and saves the choice for the next visit.
   *
   * @returns {boolean} The new mute state.
   */
  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    SoundManager.saveMuted(this.isMuted);
    if (this.isMuted) {
      this.pauseAll();
    } else if (this.isMusicWanted) {
      this.music.play().catch(() => {});
    }
    return this.isMuted;
  }


  /**
   * @returns {boolean} The saved mute state, false if nothing is saved.
   */
  static loadMuted(): boolean {
    try {
      return localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  }


  /**
   * @param {boolean} isMuted - Mute state to save.
   * @returns {void}
   */
  static saveMuted(isMuted: boolean): void {
    try {
      localStorage.setItem(MUTE_STORAGE_KEY, String(isMuted));
    } catch {
      // Storage can be blocked (e.g. private mode). The game still works without it.
    }
  }
}

/** One shared instance for the whole game. */
export const soundManager = new SoundManager();
