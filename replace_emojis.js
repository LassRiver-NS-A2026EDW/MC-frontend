const fs = require('fs');
const path = require('path');

const emojiMap = {
  '🏠': 'Home',
  '📖': 'BookOpen',
  '❤️': 'Heart',
  '💬': 'MessageSquare',
  '👤': 'User',
  '📊': 'LayoutDashboard',
  '📝': 'FileText',
  '📈': 'TrendingUp',
  '📚': 'Book',
  '📋': 'ClipboardList',
  '✅': 'CheckCircle',
  '🚩': 'Flag',
  '📭': 'Inbox',
  '🌟': 'Star',
  '⭐': 'Star',
  '💔': 'HeartOff',
  '🤍': 'Heart',
  '🔍': 'Search'
};

const componentsDir = path.join(__dirname, 'src', 'app', 'components');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processFiles() {
  walkDir(componentsDir, (filePath) => {
    if (filePath.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let changed = false;
      let usedIcons = new Set();
      
      for (const [emoji, icon] of Object.entries(emojiMap)) {
        if (content.includes(emoji)) {
          // Replace emoji with lucide-icon. 
          // Sometimes it's inside a heading or button, so we'll replace the emoji character directly with a lucide-icon tag.
          // Note: The icon will be passed as a string and we will need to import it in the TS file.
          // Actually, lucide-angular requires passing the icon object to `[img]`.
          // We can't just pass string if it's not mapped.
          // Instead of a complex script, let's just do text replacements for exact lines.
          console.log(`Found ${emoji} in ${filePath}`);
        }
      }
    }
  });
}

processFiles();
