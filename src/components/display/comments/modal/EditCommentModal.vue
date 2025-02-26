<template>
  <ClassicModal
    id-modal="edit-comment-modal"
    :title-modal="$t('Edit comment')"
    @close="closePopup"
  >
    <template #body>
      <ClassicLoading
        :loading-text="inProcessing ? $t('Send in progress') : undefined"
        :error-text="errorUpdate ? $t(`An error occurred`) : undefined"
      />
      <template v-if="!inProcessing && !errorUpdate">
        <ClassicInputText
          v-model:text-init="name"
          v-model:error-variable="errorName"
          input-id="username-input"
          :label="$t('Your name')"
          :max-length="MAX_NAME"
        />
        <ClassicInputText
          v-model:text-init="commentText"
          v-model:error-variable="errorCommentText"
          input-id="comment-textarea"
          :label="$t('Comment')"
          :max-length="MAX_DESCRIPTION"
          :error-text="$t('Please provide a comment')"
          :is-textarea="true"
          :is-emoji-picker="true"
          emoji-relative-class="octopus-modal-dialog"
          :focus="true"
        />
        <ClassicSelect
          v-if="editRight"
          v-model:text-init="commentState"
          id-select="comment-state-select"
          :label="$t('Status')"
          :display-label="true"
          :options="[
            { title: $t('pending'), value: 'PENDING' },
            { title: $t('Validated'), value: 'VALIDATED' },
            { title: $t('Invalid'), value: 'NOT_VALID' },
          ]"
        />
      </template>
    </template>
    <template #footer>
      <button class="btn m-1" @click="closePopup">
        {{ $t("No") }}
      </button>
      <button
        class="btn btn-primary m-1"
        :disabled="errorName || errorCommentText"
        @click="onEditComment"
      >
        {{ $t("Yes") }}
      </button>
    </template>
  </ClassicModal>
</template>

<script lang="ts">
import classicApi from "../../../../api/classicApi";
import Constants from "../../../../../public/config";
import { defineAsyncComponent, defineComponent } from "vue";
import { CommentPodcast } from "@/stores/class/general/comment";
const ClassicModal = defineAsyncComponent(
  () => import("../../../misc/modal/ClassicModal.vue"),
);
const ClassicLoading = defineAsyncComponent(
  () => import("../../../form/ClassicLoading.vue"),
);
const ClassicInputText = defineAsyncComponent(
  () => import("../../../form/ClassicInputText.vue"),
);
const ClassicSelect = defineAsyncComponent(
  () => import("../../../form/ClassicSelect.vue"),
);
export default defineComponent({
  name: "EditCommentModal",

  components: {
    ClassicModal,
    ClassicLoading,
    ClassicInputText,
    ClassicSelect,
  },

  props: {
    comment: {
      default: undefined,
      type: Object as () => CommentPodcast,
    },
    editRight: { default: false, type: Boolean },
  },

  emits: ["close", "update:comment"],
  data() {
    return {
      MAX_DESCRIPTION: Constants.MAX_COMMENT as number,
      MAX_NAME: Constants.MAX_COMMENT_NAME as number,
      name: undefined as string | undefined,
      commentText: undefined as string | undefined,
      errorName: true as boolean,
      errorCommentText: true as boolean,
      commentState: "PENDING" as string,
      errorUpdate: false as boolean,
      inProcessing: false as boolean,
    };
  },
  created() {
    this.initComment();
  },
  methods: {
    initComment() {
      if (!this.comment) {
        return;
      }
      this.name = this.comment.poster.userName;
      this.commentText = this.comment.content;
      this.commentState = this.comment.state;
    },
    async onEditComment() {
      if (!this.comment) {
        return;
      }
      this.inProcessing = true;
      try {
        const commentUpdated = await classicApi.putData({
          api: 2,
          path: "comment/",
          dataToSend: {
            commentId: this.comment.commentId,
            content: this.commentText,
            name: this.name,
            state: this.commentState,
          },
          isNotAuth: !this.editRight,
        });
        this.$emit("update:comment", commentUpdated);
        this.closePopup();
      } catch {
        this.errorUpdate = true;
      }
      this.inProcessing = false;
    },
    closePopup() {
      this.$emit("close");
    },
  },
});
</script>
