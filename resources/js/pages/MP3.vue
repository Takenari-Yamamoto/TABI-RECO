
<template>
  <v-form
    ref="form"
    lazy-validation
    method="post"
  >
    <v-dialog
      v-model="dialog"
      width="600px"
    >
      <template #activator="{ on, attrs }">
        <!-- mp3 upload -->
        <div
          v-bind="attrs"
          v-on="on"
        >
          <v-icon
            id="mp3_icon"
            large
          >
            mdi-folder-music-outline
          </v-icon>
        </div>
      </template>
      <v-card>
        <v-file-input
          id="upload-file"
          label="File input"
        >
          <template #append-outer>
            <v-btn
              color="success"
              class="mr-3"
              @click="upload(); loading = true"
            >
              submit
            </v-btn>
            <v-progress-linear
              height="100"
              :active="loading"
              :indeterminate="loading"
              absolute
              bottom
              color="light-blue"
              value="10"
              striped
            />
          </template>
        </v-file-input>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AwsS3Upload',
  data() {
    return {
      dialog: false,
      dictation: null,
      loading: false,
      username: this.$store.getters['auth/username'],
    };
  },
  computed: {
    isLogin () {
      return this.$store.getters['auth/check'];
    },
  },
  watch: {
    loading (val) {
      if (!val) return;
      setTimeout(() => (this.loading = false), 100000);
    },
  },
  methods: {
    async upload() { 
      const upload_files = document.getElementById('upload-file');
      const upload_file = upload_files.files[0];
      // 署名付きPOSTのAPI叩く
      let preSignedUrl = await this.getPresignedUrl();
      // S3へアップロード
      let uploadS3Path = await this.uploadS3(preSignedUrl, upload_file);
      console.log(uploadS3Path);
      this.$router.go({path: this.$router.currentRoute.path, force: true});
    },
    async getPresignedUrl() {
      let filename = this.username + '/' + this.$route.params['dictationId'];
      let filetype = 'audio/*';
      let fileext = 'mp3';
      try {
          const url = '/api/get-presigned-url?filename=' +  filename + '&filetype=' + filetype + '&fileext=' + fileext;
          let response = await axios.get(url);
          console.log('S3署名付きURL取得 成功');
          console.log(response);
          return response;
      } catch (error) {
          console.log('S3 署名付きURL取得 失敗');
      }
    },
    async uploadS3(presignedUrl, up_file) {
      let data = presignedUrl.data;
      try {
        var formdata = new FormData();
        for (let key in data.fields) {
            formdata.append(key, data.fields[key]);
        }
        formdata.append("file", up_file);
        const headers = {
            "content-type": "audio/mpeg",
        };
        // eslint-disable-next-line no-unused-vars
        let response = await axios.post(
          data.url,
          formdata,
          {
            headers: headers,
          }
        );
        return data.url + '/' + data.fields.key;
      } catch (error) {
          console.log('S3 アップロード エラー');
      }
    },
  },
  
};
</script>
