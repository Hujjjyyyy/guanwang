// SUSHUN v0.0.6 核心逻辑
document.addEventListener('DOMContentLoaded', () => {
    // 导航栏高度动态调整
    const navbar = document.querySelector('.navbar');
    const resizeObserver = new ResizeObserver(entries => {
        const navHeight = entries[0].contentRect.height;
        document.documentElement.style.setProperty('--navbar-height', `${navHeight}px`);
        document.body.style.paddingTop = `${navHeight}px`;
    });
    resizeObserver.observe(navbar);

    // 商品卡片交互
    document.querySelectorAll('.product-card').forEach(card => {
        let bounds;
        
        const rotateToMouse = (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const leftX = mouseX - bounds.x;
            const topY = mouseY - bounds.y;
            const center = {
                x: leftX - bounds.width / 2,
                y: topY - bounds.height / 2
            };
            
            card.style.transform = `
                rotateX(${center.y / -20}deg)
                rotateY(${center.x / 20}deg)
            `;
        };

        card.addEventListener('mouseenter', () => {
            bounds = card.getBoundingClientRect();
            card.addEventListener('mousemove', rotateToMouse);
        });

        card.addEventListener('mouseleave', () => {
            card.removeEventListener('mousemove', rotateToMouse);
            card.style.transform = 'none';
        });
    });

    // 页脚功能
    const updateCopyrightYear = () => {
        const yearElement = document.getElementById('copyright-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    };

    // 视频懒加载
    const loadHeroVideo = () => {
        const video = document.querySelector('.hero-video');
        if (video && !video.src) {
            video.src = video.dataset.src;
            video.load();
        }
    };

    // 初始化执行
    updateCopyrightYear();
    loadHeroVideo();

    // 调试输出
    console.log('[系统初始化完成] 版本号:0.0.6');
    console.log('[性能参数] 导航栏高度:', 
        getComputedStyle(document.documentElement)
            .getPropertyValue('--navbar-height'));
});
