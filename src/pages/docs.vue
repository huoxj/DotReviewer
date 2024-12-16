<template>
  <div>
    <v-container class="config-wrapper">
      <v-row class="custom-row">
        <v-col cols="3" class="custom-col">
          <v-list dense>
            <v-list-item-group v-model="selectedSection">
              <v-list-item value="overview" @click="scrollToSection('overview')">
                <v-list-item-content>
                  <v-list-item-title>Overview</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item value="quickstart" @click="scrollToSection('quickstart')">
                <v-list-item-content>
                  <v-list-item-title>Quick Start</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item value="faq" @click="scrollToSection('faq')">
                <v-list-item-content>
                  <v-list-item-title>Q&A</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="9" class="content-col" @scroll="onScroll">
          <div ref="overview" class="content-section">
            <h2>Overview</h2>
            <p>AI Code Review Tool 是一个基于人工智能的代码检查工具，通过集成聊天功能与代码分析引擎，提供智能化的代码质量检测和优化建议。</p>
            <h3>Features</h3>
            <ul>
              <li>多语言支持：支持 C++、Python、Java等主流编程语言。</li>
              <li>聊天式交互: 可通过在提供的代码编辑器中输入代码，并调整相应配置项，点击生成回答获得实时反馈。</li>
              <li>自动化检测：自动检查代码中的常见错误、代码风格问题，并提供优化建议。</li>
              <li>对比清晰：相应问题代码高亮显示，问题描述对应展示，界面清晰，对比明显。</li>
            </ul>
          </div>
          <div ref="quickstart" class="content-section">
            <h2>Quick Start</h2>
            <ol>
              <li>进入首页，点击左侧中间的 GET STARTED 图标即可跳转至代码检查（Reviewer）页面。</li>
              <li>在代码检查界面左侧的代码编辑器中可以输入希望检查的代码，在右侧的配置项中可以进行相应的配置（代码检查标准）。</li>
              <li>完成代码输入和检查配置后点击右侧最下方的 START AI REVIEW 即可开始检查，等待回答完毕。</li>
              <li>回答加载完成后可以在页面上看到相关问题代码的高亮，可以选择高亮代码对应的详情查看 AI 的回答。</li>
              <li>可以继续根据 AI 的回答对代码进行修改，并增减调整配置项，点击右侧下方 REGENERATE 重新生成。</li>
            </ol>
          </div>
          <div ref="faq" class="content-section">
            <h2>Q&A</h2>
            <h3>Q1：为什么我在提交代码后没有看到任何问题报告？</h3>
            <p>A1：请确保代码格式正确，并且选择了合适的代码检查标准。如果代码中没有明显的错误或风格问题，工具将不会返回问题报告。你可以通过调整检查配置项来进行更细致的检查。</p>
            <h3>Q2：如何切换不同的编程语言？</h3>
            <p>A2：在页面右侧的配置项中，可以选择你当前代码所使用的编程语言。确保语言选项与代码一致，以获得准确的检查结果。</p>
            <h3>Q3: 为什么生成回答时需要等待较长时间？</h3>
            <p>A3: 生成回答的时间取决于代码的长度和复杂度，工具需要对代码进行深入的分析。较大的代码文件或复杂的检查配置可能会增加处理时间。</p>
            <h3>Q4: AI 给出的优化建议是否会影响功能正确性？</h3>
            <p>A4: AI 提供的建议旨在优化代码质量和可读性，但不保证所有建议在功能上完全正确。在应用建议前，建议你仔细查看并结合实际需求进行测试。</p>
            <h3>Q5: 工具是否支持团队协作？</h3>
            <p>A5: 工具目前支持单用户模式，但未来版本可能会添加团队协作功能，允许多用户共享检查结果并进行讨论。</p>
            <h3>Q6: AI的检查建议会影响我现有的代码格式吗？</h3>
            <p>A6: AI的建议只会针对存在的问题部分，不会自动修改整个代码格式。在你选择应用建议时，代码的整体格式将保持不变，除非建议与格式相关。</p>
            <h3>Q7: 如果我不明白AI的建议，可以在哪里获取更多帮助？</h3>
            <p>A7: 如果对某个建议不理解，你可以通过平台的聊天功能直接询问AI，AI会进一步解释问题的原因和修复方法。</p>
            <h3>Q8: 能否对某个代码片段进行更细致的检查？</h3>
            <p>A8: 可以。你可以在代码编辑器中仅输入想要检查的代码片段，或者将已有代码文件分割为小部分进行逐步检查，这样能提高检查的精度并加快反馈速度。</p>
            <h3>Q9: 为什么有些代码问题在第一次检查时没有被发现？</h3>
            <p>A9: 部分问题可能需要根据不同的检查标准进行更细致的检测。如果初次检查未发现问题，你可以调整检查配置（如启用更严格的检查标准），并再次运行检查。</p>
            <h3>Q10: 工具能否帮助优化代码性能，而不仅是代码风格？</h3>
            <p>A10: 是的，工具不仅可以发现代码风格和常见错误，还可以提供性能优化建议，比如减少重复计算、改进算法复杂度等。不过，具体的性能优化建议会依赖于所使用的编程语言和代码内容。</p>
            <h3>Q11: 可以检查多文件项目吗？</h3>
            <p>A11: 目前工具支持对单个文件进行检查。如果你有多文件项目，建议逐一检查每个文件，未来我们可能会推出支持多文件项目检查的功能。</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';

const selectedSection = ref('overview');
const overview: Ref<HTMLElement | null> = ref(null);
const quickstart: Ref<HTMLElement | null> = ref(null);
const faq: Ref<HTMLElement | null> = ref(null);

function onScroll(event: Event) {
  const sections = ['overview', 'quickstart', 'faq'];
  const scrollTop = (event.target as HTMLElement).scrollTop;
  const sectionOffsets = sections.map(section => {
    const el = document.querySelector(`[ref="${section}"]`) as HTMLElement;
    return el ? el.offsetTop : 0;
  });

  for (let i = sections.length - 1; i >= 0; i--) {
    if (scrollTop >= sectionOffsets[i]) {
      selectedSection.value = sections[i];
      break;
    }
  }
}

function scrollToSection(section: string) {
  let el: HTMLElement | null = null;
  if (section === 'overview') {
    el = overview.value;
  } else if (section === 'quickstart') {
    el = quickstart.value;
  } else if (section === 'faq') {
    el = faq.value;
  }
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<style scoped>
/* 其他样式保持不变 */

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
  left: 10%;
  transform: translate(0, -46%);
  width: 90%;
  height: 88vh;
}

.custom-col {
  overflow-y: auto;
  height: 100%;
}

.content-col {
  overflow-y: auto;
  height: 100%;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.content-col::-webkit-scrollbar {
  display: none;
}

.content-section {
  margin-bottom: 20px;
}

h2 {
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 28px;
  color: #3f51b5;
}

h3 {
  margin-top: 15px;
  margin-bottom: 10px;
  font-size: 20px;
  color: #3473b2;
}

ul, ol {
  margin-left: 20px;
  margin-bottom: 20px;
  line-height: 2.0;
}

p {
  margin-bottom: 20px;
  line-height: 1.8;
}
</style>
