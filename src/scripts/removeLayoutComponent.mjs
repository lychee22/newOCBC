import fs from 'fs';
import path from 'path';

// 页面文件目录
const pagesDir = new URL('../pages', import.meta.url).pathname;

// 获取所有页面文件
const pageFiles = fs.readdirSync(pagesDir)
  .filter(file => file.endsWith('.tsx'))
  .map(file => path.join(pagesDir, file));

// 处理每个页面文件
pageFiles.forEach(filePath => {
  console.log(`处理文件: ${filePath}`);
  
  // 读取文件内容
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. 移除 LayoutComponent 导入
  const importStr = "import LayoutComponent from '../components/common/Layout/Layout';\n";
  content = content.split(importStr).join('');
  
  // 2. 移除 LayoutComponent 开始标签（处理不同缩进）
  const startTag1 = "    <LayoutComponent>\n";
  const startTag2 = "  <LayoutComponent>\n";
  content = content.split(startTag1).join('');
  content = content.split(startTag2).join('');
  
  // 3. 移除 LayoutComponent 结束标签（处理不同缩进）
  const endTag1 = "    </LayoutComponent>\n";
  const endTag2 = "  </LayoutComponent>\n";
  content = content.split(endTag1).join('');
  content = content.split(endTag2).join('');
  
  // 写入修改后的内容
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`文件处理完成: ${filePath}`);
});

console.log('所有页面文件处理完成！');