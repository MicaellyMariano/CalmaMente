
// Sistema de Analytics Local
function updateVisitCounter() {
    // Pega o contador atual do localStorage ou inicia com 0
    let visits = parseInt(localStorage.getItem('siteVisits')) || 0;
    
    // Pega a data da última visita
    let lastVisit = localStorage.getItem('lastVisit');
    let now = new Date().toISOString();
    
    // Se é um novo dia, incrementa o contador
    if (!lastVisit || new Date(lastVisit).toDateString() !== new Date().toDateString()) {
        visits++;
        localStorage.setItem('siteVisits', visits);
        localStorage.setItem('lastVisit', now);
        
        // Atualiza o contador visual na navbar
        document.getElementById('visitCount').textContent = visits;
        console.log(`Total de visitas: ${visits}`);
    }
    
    // Atualiza o contador visual mesmo se não for uma nova visita
    document.getElementById('visitCount').textContent = visits;
    
    // Atualiza o tempo de permanência
    let sessionStart = localStorage.getItem('sessionStart');
    if (!sessionStart) {
        localStorage.setItem('sessionStart', now);
    }
    
    // Atualiza estatísticas a cada 5 segundos
    setInterval(() => {
        let timeOnSite = Math.floor((new Date() - new Date(sessionStart)) / 1000);
        console.log(`Tempo na página: ${timeOnSite} segundos`);
    }, 5000);
}

// Inicia o contador quando a página carrega
document.addEventListener('DOMContentLoaded', updateVisitCounter);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const navbar = document.querySelector(".navbar")
      const navbarHeight = navbar ? navbar.offsetHeight : 0
      const targetPosition = target.offsetTop - navbarHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })

      
      const navbarCollapse = document.querySelector(".navbar-collapse")
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show")
      }
    }
  })
})


window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (!navbar) return
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)"
  } else {
    navbar.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
  }
})


const scrollTopBtn = document.getElementById("scrollTopBtn")

window.addEventListener("scroll", () => {
  if (!scrollTopBtn) return
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show")
  } else {
    scrollTopBtn.classList.remove("show")
  }
})

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}


const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")

function activateNavLink() {
  const scrollY = window.pageYOffset

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 100
    const sectionId = section.getAttribute("id")

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

window.addEventListener("scroll", activateNavLink)

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

document.addEventListener("DOMContentLoaded", () => {
  
  if (window.AOS) {
    window.AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    })
  }

  const animatedElements = document.querySelectorAll(
    ".content-card, .disorder-card, .theme-card, .emergency-card, .care-item, .treatment-item, .care-card, .treatment-card",
  )

  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"
    observer.observe(element)
  })
})


document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbarToggler = document.querySelector(".navbar-toggler")
    const navbarCollapse = document.querySelector(".navbar-collapse")

    if (window.innerWidth < 992 && navbarCollapse && navbarCollapse.classList.contains("show")) {
      if (navbarToggler) navbarToggler.click()
    }
  })
})


document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    if (window.innerWidth > 768) {
      e.preventDefault()
      alert("Número de emergência: " + this.textContent)
    }
  })
})


window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease-in"
    document.body.style.opacity = "1"
  }, 100)
})

 
