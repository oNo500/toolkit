# SVG Icon 使用备忘录

> 仅处理单色图标

## 1. SVG 文件规范

- 每个 SVG 文件都要有 `viewBox` 属性（如 `viewBox="0 0 24 24"`），否则无法等比缩放。
- `width` 和 `height` 推荐都设置为 `1em`：
  ```xml
  <svg width="1em" height="1em" viewBox="0 0 24 24" ...>...</svg>
  ```
- 推荐保留 `fill="currentColor"`，这样可以用 CSS 控制图标颜色。

---

## 2. 如何改变 SVG 图标大小

- SVG 的实际显示尺寸由其父元素的 `font-size` 决定。
- 只需设置父元素或 SVG 本身的 `font-size`，即可改变图标大小。
  ```jsx
  <span style={{ fontSize: '32px' }}>
    <svg width="1em" height="1em" ...>...</svg>
  </span>
  ```
  或 / or
  ```css
  .icon {
    font-size: 2rem;
  }
  ```
  ```jsx
  <svg className="icon" ...>...</svg>
  ```

---

## 3. 常见问题

- **没有 viewBox？/ No viewBox?**  
  → SVG 无法等比缩放，务必补上。
- **不同 viewBox 会影响缩放吗？/ Does different viewBox affect scaling?**  
  → 只要有 viewBox，内容会自动缩放到 1em × 1em。
- **如何批量处理？/ How to batch process?**  
  → 用 svgo 配置插件，输出到新目录即可。

---

## 4. 批量处理工具与命令

### 4.1 批量修改 SVG 宽高为 1em，并输出到新目录 and output to new dir

#### 安装 svgo

```bash
pnpm add -D svgo
# 或 / or npm install -D svgo
```

#### 新建 svgo.config.js（项目根目录）

```js
module.exports = {
  plugins: [
    {
      name: "removeAttrs",
      params: {
        attrs: "(width|height)",
      },
    },
    {
      name: "addAttributesToSVGElement",
      params: {
        attributes: [{ width: "1em" }, { height: "1em" }],
      },
    },
    {
      name: "removeViewBox",
      active: false, // 禁用移除 viewBox，确保 viewBox 保留
    },
  ],
};
```

#### 批量处理命令

```bash
mkdir -p ./packages/ui/src/assets/icons-svg
npx svgo -f ./packages/ui/src/assets/icons -o ./packages/ui/src/assets/icons-svg
```

- 这样会把所有 SVG 文件处理后输出到 `icons-svg` 目录，原文件不会被覆盖。
- 处理后 SVG 文件宽高为 1em，viewBox 保留。

---

## 5. 参考链接

- [SVGO 官方文档 / SVGO Official Docs](https://github.com/svg/svgo)
- [SVG viewBox 详解 / SVG viewBox Explained](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/viewBox)
