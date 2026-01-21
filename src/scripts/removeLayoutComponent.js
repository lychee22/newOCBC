const fs = require('fs');
const path = require('path');

// 页面文件目录
const pagesDir = path.join(__dirname, '../pages');

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
  content = content.replace(importStr, '');
  
  // 2. 移除 LayoutComponent 开始标签
  const startTag = "    <LayoutComponent>\n";
  content = content.replace(startTag, '');
  
  // 3. 移除 LayoutComponent 结束标签
  const endTag = "    </LayoutComponent>\n";
  content = content.replace(endTag, '');
  
  // 写入修改后的内容
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`文件处理完成: ${filePath}`);
});

console.log('所有页面文件处理完成！');