<template>
  <div class = "scroll-hint-con scroll-anchor-wrapper" style = "max-height: 100vh;">
    <div class = "scroll-anchor fixed">
      <div class = "scroll-anchor-ink"><span class = "scroll-anchor-ink-ball"
                                             style = "top: 0; height: 30px;"></span>
      </div>
      <div class = "scroll-hint scroll-anchor-link">
        <a class = "scroll-anchor-link-title"
           title = "">
          <svg class = "arrow-down_svg__icon" viewBox = "0 0 1024 1024" width = "200" height = "200">
            <path
              d = "M486.969 1014.101l-.683-.625-306.745-315.279a34.133 34.133 0 0 1 0-47.616l3.015-3.072a34.133 34.133 0 0 1 48.242-.682l.683.682 238.478 245.078-.057-858.454A34.133 34.133 0 0 1 504.036 0h3.3a34.133 34.133 0 0 1 34.132 34.133v870.97l250.653-257.594a34.133 34.133 0 0 1 48.242-.682l.682.682 3.015 3.072a34.133 34.133 0 0 1 0 47.616l-306.744 315.279a34.076 34.076 0 0 1-26.909 10.24h-2.105a34.02 34.02 0 0 1-21.333-9.615z"></path>
          </svg>
        </a></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'scroll-hint',
  methods: {
  }
}
</script>

<style lang = "less" scoped>
.scroll-anchor-ink {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}

.scroll-anchor-ink-ball {
  position: absolute;
  left: 50%;
  display: none;
  width: 4px;
  height: 30px;
  background-color: #3370ff;
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  transition: top .3s ease-in-out;
  border-radius: 2px;
}

.scroll-anchor.fixed .scroll-anchor-ink .scroll-anchor-ink-ball {
  display: none;
}

.scroll-anchor-link-title {
  position: relative;
  display: block;
  margin-bottom: 6px;
  overflow: hidden;
  color: #1f2329;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: all .3s;
  cursor: pointer;
}

.scroll-anchor-link-title:only-child {
  margin-bottom: 0;
}

.scroll-hint-con {
  width: 100%;
  position: absolute;
  text-align: center;
  background: rgba(0, 0, 0, 0);
  overflow: hidden;
  z-index: 888;
  bottom: 0;

  >:after {
    content: "";
    display: block;
    position: relative;
    height: 36px;
    border-left: 1px dashed #fff;
    left: calc(50% + 1px);
    top: 14px;
  }

  .scroll-anchor-ink {
    display: none;
  }

  .scroll-hint {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    border: 1px solid #fff;
    margin: 0 auto;
    padding: 0;
    line-height: 28px;

    a {
      padding: 4px 0;
      width: 100%;
      height: 100%;
    }
  }

  svg {
    height: 18px;
    width: 18px;
    fill: #fff;
    -webkit-animation: jump 1s infinite;
    animation: jump 1s infinite;
  }
}

.scroll-anchor-wrapper {
  margin-left: -4px;
  padding-left: 4px;
}

.scroll-anchor {
  box-sizing: border-box;
  margin: 0;
  color: #1f2329;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  -webkit-font-feature-settings: "tnum";
  font-feature-settings: "tnum";
  position: relative;
  padding: 0 0 0 2px;
}

@keyframes jump {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
