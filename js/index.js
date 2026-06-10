// ======================== script.js ========================
// 网址数据（您可任意增删改）
const ORIGINAL_LINKS = [
    {
        name: "CloudConvert",
        url: "https://cloudconvert.com/",
        description: "全能在线文件转换器 — 支持音视频、文档、图像等200+格式互转，免费高效。",
        icon: "fas fa-file-alt",
        badge: "文件转换"
    },
    {
        name: "英语真题/资料库",
        url: "https://zhenti.burningvocabulary.cn/",
        description: "海量英语真题、考研/四六级/雅思备考资料，免费在线阅读与下载。",
        icon: "fas fa-language",
        badge: "英语学习"
    },
    {
        name: "英语外刊-巴别阅读",
        url: "https://babie.cc/",
        description: "主打英文外刊双语阅读的学习网站，提供外媒文章、中英对照、点击查词等功能，助力英语学习。",
        icon: "fa-solid fa-language",
        badge: "英语学习"
    },
    {
        name: "部落冲突脚本分享",
        url: "http://cocfz.com/index.html",
        description: "COC玩家社区，游戏脚本、阵型分享、辅助工具与攻略聚集地。",
        icon: "fas fa-gamepad",
        badge: "游戏脚本"
    },
    {
        name: "Qwerty Learner键盘语言学习",
        url: "https://qwerty.kaiyi.cool/gallery",
        description: "为键盘工作者设计的单词与肌肉记忆锻炼软件",
        icon: "fas fa-globe",
        badge: "键盘学习工具"
    },
    {
        name: "美剧-4K影视",
        url: "https://www.4kvm.top/",
        description: "提供影视剧、动漫、电影等影视内容在线播放的站点，含4K片源，该网站存在版权侵权与网络安全风险，谨慎访问。",
        icon: "fa fa-video-camera",
        badge: "影视站点"
    },
    {
        name: "GitHub 开源代码库",
        url: "https://github.com",
        description: "全球技术社区，寻找实用脚本与开源项目。",
        icon: "fab fa-github",
        badge: "开发者"
    },
    {
        name: "开源免费资源导航网站",
        url: "https://fmhy.net/",
        description: "整理、汇总各类免费网络资源的外部链接，被称作全网免费资源 “导航地图”。",
        icon: "fa-solid fa-circle-nodes",
        badge: "免费资源"
    }
];

// 当前展示的数据（初始为全部）
let currentDisplayLinks = [...ORIGINAL_LINKS];

// ---------- 渲染网址卡片 ----------
function renderLinks() {
    const container = document.getElementById('linksContainer');
    if (!container) return;
    if (!currentDisplayLinks.length) {
        container.innerHTML = `<div class="no-results"><i class="fas fa-search-minus"></i> 没有找到相关网址，试试其他关键词～</div>`;
        return;
    }
    let html = '';
    for (let item of currentDisplayLinks) {
        const safeName = escapeHtml(item.name);
        const safeDesc = escapeHtml(item.description);
        const safeUrl = item.url;
        const iconClass = item.icon || 'fas fa-link';
        const badgeText = item.badge ? `<span style="background: rgba(59,130,246,0.3); border-radius: 20px; padding: 0.2rem 0.6rem; font-size: 0.65rem; font-weight: normal;">${escapeHtml(item.badge)}</span>` : '';
        html += `
            <div class="card">
                <div class="card-icon"><i class="${iconClass}"></i></div>
                <h3>${safeName} ${badgeText}</h3>
                <div class="card-desc">${safeDesc}</div>
                <a href="${safeUrl}" class="card-link" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-external-link-alt"></i> 立即访问
                </a>
            </div>
        `;
    }
    container.innerHTML = html;
    updateSearchStats();
}

function updateSearchStats() {
    const statsEl = document.getElementById('searchStats');
    if (statsEl) {
        const total = ORIGINAL_LINKS.length;
        const shown = currentDisplayLinks.length;
        if (shown === total) {
            statsEl.innerHTML = `📚 共 ${total} 个实用站点`;
        } else {
            statsEl.innerHTML = `🔍 找到 ${shown} 个相关站点 (共 ${total} 个)`;
        }
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// ---------- 搜索过滤 ----------
function filterLinks(searchTerm) {
    const term = searchTerm.trim().toLowerCase();
    if (term === '') {
        currentDisplayLinks = [...ORIGINAL_LINKS];
    } else {
        currentDisplayLinks = ORIGINAL_LINKS.filter(item => {
            return (
                item.name.toLowerCase().includes(term) ||
                item.description.toLowerCase().includes(term) ||
                (item.badge && item.badge.toLowerCase().includes(term))
            );
        });
    }
    renderLinks();
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
        filterLinks('');
    }
}

// ---------- 背景图片控制 ----------
const DEFAULT_BG_IMAGE = '/GuoshareIndex/static/kosaki.png';
const STORAGE_BG_KEY = 'customBgUrl';

function setBackgroundImage(url) {
    const bgUrl = url && url.trim() !== '' ? url.trim() : DEFAULT_BG_IMAGE;
    document.body.style.backgroundImage = `url('${bgUrl}')`;
    if (url && url.trim() !== '') {
        localStorage.setItem(STORAGE_BG_KEY, bgUrl);
    } else {
        localStorage.removeItem(STORAGE_BG_KEY);
    }
}

function loadSavedBackground() {
    const savedBg = localStorage.getItem(STORAGE_BG_KEY);
    if (savedBg && savedBg !== '') {
        setBackgroundImage(savedBg);
        const inputEl = document.getElementById('bgUrlInput');
        if (inputEl) inputEl.value = savedBg;
    } else {
        setBackgroundImage(DEFAULT_BG_IMAGE);
    }
}

function applyBackgroundFromUrl() {
    const urlInput = document.getElementById('bgUrlInput');
    let newUrl = urlInput.value.trim();
    if (!newUrl) {
        setBackgroundImage(DEFAULT_BG_IMAGE);
        localStorage.removeItem(STORAGE_BG_KEY);
        urlInput.value = '';
        showToast('已恢复默认背景', 1500);
    } else {
        setBackgroundImage(newUrl);
        showToast('✅ 背景已更换！', 1200);
    }
}

function handleLocalImageUpload(file) {
    if (!file || !file.type.startsWith('image/')) {
        showToast('请选择有效的图片文件', 1500);
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageDataUrl = e.target.result;
        document.body.style.backgroundImage = `url("${imageDataUrl}")`;
        try {
            localStorage.setItem(STORAGE_BG_KEY, imageDataUrl);
            showToast('🖼️ 本地图片已设为背景 (已保存至本浏览器)', 2000);
            const urlInput = document.getElementById('bgUrlInput');
            if (urlInput) urlInput.value = '';
        } catch (e) {
            console.warn("存储过大可能导致失败", e);
            showToast('图片已应用，但存储失败（图片过大，不影响本次使用）', 2000);
        }
    };
    reader.readAsDataURL(file);
}

function resetToDefaultBg() {
    setBackgroundImage(DEFAULT_BG_IMAGE);
    localStorage.removeItem(STORAGE_BG_KEY);
    const urlInput = document.getElementById('bgUrlInput');
    if (urlInput) urlInput.value = '';
    showToast('已重置为默认背景', 1500);
}

let toastTimeout;
function showToast(msg, duration = 2000) {
    let toast = document.getElementById('dynamicToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'dynamicToast';
        toast.style.position = 'fixed';
        toast.style.bottom = '25px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = 'rgba(0,0,0,0.8)';
        toast.style.backdropFilter = 'blur(12px)';
        toast.style.color = 'white';
        toast.style.padding = '10px 20px';
        toast.style.borderRadius = '50px';
        toast.style.fontSize = '0.85rem';
        toast.style.zIndex = '9999';
        toast.style.pointerEvents = 'none';
        toast.style.fontWeight = '500';
        toast.style.border = '1px solid rgba(255,255,255,0.2)';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.style.opacity = '0';
    }, duration);
}

// ---------- 页面URL复制分享 ----------
function displayPageUrl() {
    const urlSpan = document.getElementById('pageUrlDisplay');
    if (urlSpan) {
        let fullUrl = window.location.href;
        if (fullUrl.startsWith('file://')) {
            fullUrl = '⚠️ 本地文件预览 | 请部署到服务器获取公开网址 ⚠️';
            urlSpan.style.color = '#facc15';
        } else {
            urlSpan.style.color = 'var(--text-light)';
        }
        urlSpan.textContent = fullUrl;
    }
}

function copyPageLink() {
    let urlToCopy = window.location.href;
    if (urlToCopy.startsWith('file://')) {
        showToast('当前是本地文件，无法复制有效公开网址，请先部署到web服务器', 2500);
        return;
    }
    navigator.clipboard.writeText(urlToCopy).then(() => {
        showToast('🔗 链接已复制！分享给任何人就能看到此导航', 2000);
    }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = urlToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('📋 复制成功（兼容模式）', 2000);
    });
}

// ---------- 初始化与事件绑定 ----------
function init() {
    renderLinks();
    loadSavedBackground();
    displayPageUrl();

    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearchBtn');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => filterLinks(e.target.value));
    }
    if (clearBtn) {
        clearBtn.addEventListener('click', clearSearch);
    }

    const setBgUrlBtn = document.getElementById('setBgFromUrl');
    const resetBgBtn = document.getElementById('resetBgBtn');
    const bgUrlInput = document.getElementById('bgUrlInput');
    const uploadInput = document.getElementById('bgUploadInput');

    if (setBgUrlBtn) setBgUrlBtn.addEventListener('click', applyBackgroundFromUrl);
    if (resetBgBtn) resetBgBtn.addEventListener('click', resetToDefaultBg);
    if (uploadInput) {
        uploadInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                handleLocalImageUpload(e.target.files[0]);
            }
            e.target.value = '';
        });
    }
    if (bgUrlInput) {
        bgUrlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') applyBackgroundFromUrl();
        });
    }

    const copyBtn = document.getElementById('copyPageBtn');
    if (copyBtn) copyBtn.addEventListener('click', copyPageLink);

    // 本地文件提醒
    if (window.location.protocol === 'file:') {
        const footerDiv = document.querySelector('.info-footer');
        if (footerDiv) {
            const warnSpan = document.createElement('div');
            warnSpan.style.marginTop = '8px';
            warnSpan.style.fontSize = '0.7rem';
            warnSpan.style.backgroundColor = 'rgba(0,0,0,0.5)';
            warnSpan.style.padding = '5px 12px';
            warnSpan.style.borderRadius = '20px';
            warnSpan.innerHTML = '<i class="fas fa-info-circle"></i> 当前为本地文件，背景修改功能仍然有效，但建议部署到GitHub Pages等托管服务以获得可分享的公网链接。';
            footerDiv.appendChild(warnSpan);
        }
    }
}

// 启动
init();
