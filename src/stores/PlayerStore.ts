import DurationHelper from "../helper/duration";
import { Media } from "@/stores/class/general/media";
import {
  MediaRadio,
  NextAdvertising,
  Radio,
} from "@/stores/class/general/player";
import { Podcast } from "@/stores/class/general/podcast";
import { defineStore } from "pinia";
import { Chaptering, ChapteringPercent } from "./class/chaptering/chaptering";
import classicApi from "../api/classicApi";
interface Transcript {
  actual: number;
  actualText: string;
  value: Array<{ endTime: number; startTime: number; text: string }>;
}
interface PlayerState {
  playerCurrentChange: number | null;
  playerStatus: string; //STOPPED, LOADING, PLAYING, PAUSED
  playerPodcast: Podcast | undefined;
  playerVolume?: number; //From 0 to 1
  playerElapsed: number; //From 0 to 1
  playerTotal: number;
  playerMedia: Media | undefined;
  playerLive: Podcast | undefined;
  playerRadio: Radio | undefined;
  playerStop?: boolean;
  playerSeekTime?: number;
  playerTranscript?: Transcript;
  playerLargeVersion: boolean;
  playerVideo: boolean;
  playerChaptering?: Chaptering;
  playerDelayStitching: number;
}
export const usePlayerStore = defineStore("PlayerStore", {
  state: (): PlayerState => ({
    playerCurrentChange: null,
    playerStatus: "STOPPED",
    playerPodcast: undefined,
    playerVolume: 1,
    playerElapsed: 0,
    playerTotal: 0,
    playerMedia: undefined,
    playerLive: undefined,
    playerRadio: undefined,
    playerSeekTime: 0,
    playerLargeVersion: false,
    playerVideo: false,
    playerChaptering: undefined,
    playerDelayStitching: 0,
  }),
  getters: {
    playerChapteringPercent(): ChapteringPercent | undefined {
      if (!this.playerChaptering || 0 === this.playerTotal) {
        return;
      }
      const chapteringPercent: ChapteringPercent = [];
      for (
        let i = 0, len = this.playerChaptering.chapters.length;
        i < len;
        i++
      ) {
        const startTime = this.playerChaptering.chapters[i].startTime;
        chapteringPercent.push({
          startTime: startTime,
          startDisplay: DurationHelper.formatDuration(startTime, ":", false),
          startPercent: (startTime * 100) / Math.round(this.playerTotal),
          endPercent: 100,
          title: this.playerChaptering.chapters[i].title,
        });
      }
      for (let i = 0, len = chapteringPercent.length; i < len; i++) {
        chapteringPercent[i].endPercent =
          chapteringPercent[i].startPercent +
          ((chapteringPercent[i + 1]?.startPercent ?? 100) -
            chapteringPercent[i].startPercent);
      }
      return chapteringPercent;
    },
    playerHeight() {
      if ("STOPPED" === this.playerStatus) return '0px';
      if (this.playerVideo) return "0px" /* "281px" */;
      if (this.playerLargeVersion) return "27rem";
      if (window.innerWidth > 450) return "6rem";
      return "3.5rem";
    },

    playerElapsedSeconds(): number {
      if (
        this.playerElapsed &&
        this.playerElapsed > 0 &&
        this.playerTotal &&
        this.playerTotal > 0
      ) {
        return this.playerElapsed * this.playerTotal;
      } else {
        return -1;
      }
    },
    playedTime(): string {
      if (-1 !== this.playerElapsedSeconds) {
        return DurationHelper.formatDuration(
          Math.round(this.playerElapsedSeconds),
        );
      }
      return "--:--";
    },
    totalTime(): string {
      if (
        this.playerElapsed &&
        this.playerElapsed > 0 &&
        this.playerTotal &&
        this.playerTotal > 0
      )
        return DurationHelper.formatDuration(Math.round(this.playerTotal));
      return "--:--";
    },
    isPlaying(): boolean {
      return "PLAYING" === this.playerStatus;
    },
    isPaused(): boolean {
      return "PAUSED" === this.playerStatus;
    },
    podcastImage(): string {
      if (this.playerRadio) {
        return this.playerRadio.podcast?.imageUrl ?? "";
      }
      return this.playerPodcast?.imageUrl ?? "";
    },
    emissionName(): string {
      return this.playerPodcast?.emission?.name ?? "";
    },
    transcriptText(): string {
      return this.playerTranscript?.actualText ?? "";
    },
    radioUrl(): string | undefined {
      return this.playerRadio?.url ?? undefined;
    },
  },
  actions: {
    async playerPlay(param?: any, isVideo = false) {
      if (!param) {
        this.playerCurrentChange = null;
        this.playerStatus = "STOPPED";
        this.playerPodcast = undefined;
        this.playerMedia = undefined;
        this.playerLive = undefined;
        this.playerRadio = undefined;
        this.playerElapsed = 0;
        this.playerVideo = false;
        this.playerChaptering = undefined;
        return;
      }
      if (
        (this.playerPodcast &&
          this.playerPodcast.podcastId === param.podcastId &&
          isVideo === this.playerVideo) ||
        (this.playerMedia && this.playerMedia.mediaId === param.mediaId) ||
        (this.playerLive &&
          this.playerLive.conferenceId === param.conferenceId &&
          isVideo === this.playerVideo)
      ) {
        //Do nothing
        return;
      }
      this.playerStatus = "LOADING";
      this.playerPodcast = undefined;
      this.playerMedia = undefined;
      this.playerLive = undefined;
      this.playerRadio = undefined;
      this.playerVideo = isVideo;
      this.playerElapsed = 0;
      this.playerChaptering = undefined;
      if (
        param.conferenceId &&
        (!param.podcastId || param.processingStatus !== "READY")
      ) {
        this.playerLive = param;
        this.playerCurrentChange = null;
        return;
      }
      if (param.podcastId) {
        this.playerPodcast = param;
        this.playerCurrentChange = param.podcastId;
        if (param.annotations?.chaptering) {
          this.playerChaptering = await classicApi.fetchData<Chaptering>({
            api:4,
            path:param.annotations.chaptering as string,
            isNotAuth:true
          });
        }
        return;
      }
      if (param.mediaId) {
        this.playerMedia = param;
        this.playerCurrentChange = null;
        return;
      }
      if (param.canalId) {
        this.playerRadio = { ...param, ...{ isInit: false } };
        this.playerCurrentChange = -param.canalId;
      }
    },

    playerChangeStatus(isPause: boolean) {
      if (isPause) {
        this.playerStatus = "PAUSED";
      } else {
        this.playerStatus = "PLAYING";
      }
    },

    playerUpdateSeekTime(seekTime: number) {
      this.playerSeekTime = seekTime;
    },
    playerMetadata(metadata: MediaRadio, history: Array<MediaRadio>) {
      if (!this.playerRadio) {
        return;
      }
      this.playerRadio.metadata = metadata;
      this.playerRadio.history = history;
    },
    playerRadioUpdateNextAdvertising(nextAdvertising: NextAdvertising) {
      if (!this.playerRadio) {
        return;
      }
      this.playerRadio.nextAdvertising = nextAdvertising;
    },
    playerRadioPodcast(podcast: Podcast | undefined) {
      if (!this.playerRadio) {
        return;
      }
      this.playerRadio.podcast = podcast;
    },

    playerUpdateElapsed(elapsed: number, total?: number) {
      this.playerElapsed = elapsed;
      if (total) {
        this.playerTotal = total;
      }
    },

    playerUpdateTranscript(transcript?: Transcript) {
      this.playerTranscript = transcript;
    },
    playerUpdateLargeVersion(largeVersion: boolean) {
      this.playerLargeVersion = largeVersion;
    },
    playerUpdateChaptering(chaptering?: Chaptering) {
      this.playerChaptering = chaptering;
    },
    playerUpdateDelayStitching(delay: number) {
      this.playerDelayStitching = delay;
    },
  },
});
