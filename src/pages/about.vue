<template>
  <div>
    <v-container class="config-wrapper">
      <v-row class="custom-row">
        <v-col class="custom-col">
          <h1>About Dot Reviewer</h1>
          <p>Dot Reviewer is an AI-powered code review tool that helps developers improve code quality and maintain coding standards.</p>

          <h2>Main Features</h2>
          <ul>
            <li>Supports multiple programming languages including C++, Python, and Java.</li>
            <li>Interactive chat-based interface for real-time feedback.</li>
            <li>Automated detection of common errors and code style issues.</li>
            <li>Clear comparison with highlighted problem areas and detailed descriptions.</li>
          </ul>

          <h2>Team Members</h2>
          <ul>
            <li>Cunxi Liu - Project Manager</li>
            <li>Tianxing Xu - Lead Developer</li>
            <li>Feng Yang - UI/UX Designer</li>
            <li>Wenrui Zhao - QA Engineer</li>
          </ul>

          <h2>Contact Us</h2>
          <p>If you have any questions or feedback, please contact us at <a href="mailto:support@dotreviewer.com">support@dotreviewer.com</a>.</p>

          <h2>Version Information</h2>
          <p>Current Version: 1.0.0</p>
          <p>Changelog:</p>
          <ul>
            <li>Initial release with basic features.</li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
// No additional script needed for this example
</script>

<style scoped>
.config-wrapper {
  position: absolute;
  top: 50%;
  transform: translate(0, -46%);
  width: 100%;
  height: 88vh;
  padding: 20px;
}

.custom-row {
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translate(0, -46%);
  width: 90%;
  height: 88vh;
}

.custom-col {
  overflow-y: auto;
  height: 100%;
  width: 90%;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.custom-col::-webkit-scrollbar {
  display: none;
}

h1 {
  font-size: 38px;
  color: #3f51b5;
}

h2 {
  font-size: 30px;
  color: #3473b2;
  margin-top: 22px;
}

p, ul {
  font-size: 16px;
  line-height: 1.8;
}

ul {
  margin-left: 22px;
}
</style>
