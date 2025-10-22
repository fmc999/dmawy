// 导航栏功能
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 关闭移动端菜单当点击链接时
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// 滚动时导航栏样式变化
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// 平滑滚动到指定部分
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 70; // 减去导航栏高度
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// 加入QQ群
function joinQQGroup() {
    window.open('https://qun.qq.com/universal-share/share?ac=1&authKey=PHjgW5iYGlkE0wAVU0XT%2FNKK6KcGTOTJaNopMuRLSxiqjuMAFeV%2FtBq9GGN0SNKR&busi_data=eyJncm91cENvZGUiOiI4NjgwOTcyNzgiLCJ0b2tlbiI6ImN6NFRWSFVkNGxzV3QxUXJWd0pLL09SbE15cTRjM0pVTExuVFVaeXdhWmZBbDYzV1NQb2k4SHhha2dEWVlTekYiLCJ1aW4iOiIyMTQ2MjYxODM5In0%3D&data=KCCUObnEYrZrpKjdEFmIyFkP4cySWQKXhzo3beNhBBoP76RzQZ93keGRV2D7525CDslDWfXKgHlMiZM_ff7TrQ&svctype=4&tempid=h5_group_info', '_blank');
}

// 打开闲鱼店铺
function openXianyuShop() {
    window.open('https://m.tb.cn/h.SQy0VDp?tk=BZJRfdvofUb', '_blank');
}



// 通知显示函数
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    // 关闭按钮样式
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'transparent';
    });
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
    
    document.body.appendChild(notification);
    
    // 自动消失
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// 添加通知动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 视频播放控制
const videos = document.querySelectorAll('.video-player');

videos.forEach(video => {
    // 添加视频加载指示器
    video.addEventListener('loadstart', function() {
        this.previousElementSibling.style.display = 'block';
    });
    
    video.addEventListener('canplay', function() {
        this.previousElementSibling.style.display = 'none';
    });
    
    // 添加自定义播放控制（可选）
    video.addEventListener('click', function() {
        if (this.paused) {
            this.play();
        } else {
            this.pause();
        }
    });
});

// 滚动动画效果
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 观察需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .video-card, .contact-info, .contact-form');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加加载完成动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 检查视频文件是否存在
    checkVideoFiles();
});

// 检查视频文件是否存在
function checkVideoFiles() {
    const videoFiles = ['video.mp4', 'video2.mp4'];
    
    videoFiles.forEach((filename, index) => {
        const video = videos[index];
        if (video) {
            video.addEventListener('error', function() {
                console.warn(`视频文件 ${filename} 加载失败`);
                // 可以在这里添加备用内容或错误提示
            });
        }
    });
}

// 添加键盘导航支持
document.addEventListener('keydown', function(e) {
    // ESC键关闭通知
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }
});

// 性能优化：图片懒加载
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// 添加页面性能监控
window.addEventListener('load', function() {
    // 记录页面加载时间
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`页面加载完成，耗时: ${loadTime}ms`);
});

// 自动更新版权年份
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}

// 页面加载完成后更新年份
document.addEventListener('DOMContentLoaded', function() {
    updateCopyrightYear();
});
