// Enhanced Portfolio JavaScript with Advanced Animations and Interactions

class Portfolio {
  constructor() {
    this.isLoading = true
    this.typingTexts = ["CS Graduate", "Web Developer", "PHP Enthusiast", "Problem Solver", "Master's Student"]
    this.currentTextIndex = 0
    this.currentCharIndex = 0
    this.isDeleting = false
    this.typingSpeed = 100
    this.deletingSpeed = 50
    this.pauseTime = 2000

    this.init()
  }

  init() {
    this.showLoadingScreen()
    this.setupCustomCursor()
    this.setupThemeToggle()
    this.setupNavigation()
    this.setupScrollEffects()
    this.setupFormHandling()
    this.setupAnimations()
    this.setupParticles()
    this.setupProjectFilter()
    this.setupMagneticButtons()
    this.initializeLucideIcons()
  }

  // Enhanced Loading Screen
  showLoadingScreen() {
    const messages = [
      "Initializing Portfolio...",
      "Loading Projects...",
      "Setting up Skills...",
      "Preparing Experience...",
      "Almost Ready...",
    ]

    let currentMessage = 0
    let progress = 0

    const updateMessage = () => {
      const messageElements = document.querySelectorAll(".loading-message")
      messageElements.forEach((msg) => msg.classList.remove("active"))

      if (messageElements[currentMessage]) {
        messageElements[currentMessage].classList.add("active")
      }

      currentMessage++
      if (currentMessage < messages.length) {
        setTimeout(updateMessage, 600)
      }
    }

    const updateProgress = () => {
      const progressBar = document.querySelector(".loading-bar")
      const progressText = document.querySelector(".loading-percentage")

      if (progressBar && progressText) {
        progress += 2
        progressText.textContent = Math.min(progress, 100) + "%"

        if (progress < 100) {
          setTimeout(updateProgress, 30)
        }
      }
    }

    // Start animations
    setTimeout(updateMessage, 500)
    setTimeout(updateProgress, 800)

    // Hide loading screen
    setTimeout(() => {
      const loadingScreen = document.getElementById("loading-screen")
      if (loadingScreen) {
        loadingScreen.classList.add("hidden")
        this.isLoading = false
        this.startTypingAnimation()
        this.animateSkillBars()
        setTimeout(() => {
          if (loadingScreen.parentNode) {
            loadingScreen.remove()
          }
        }, 800)
      }
    }, 4000)
  }

  // Custom Cursor
  setupCustomCursor() {
    if (window.innerWidth <= 768) return

    const cursorDot = document.querySelector(".cursor-dot")
    const cursorOutline = document.querySelector(".cursor-outline")

    if (!cursorDot || !cursorOutline) return

    document.addEventListener("mousemove", (e) => {
      const posX = e.clientX
      const posY = e.clientY

      cursorDot.style.left = `${posX}px`
      cursorDot.style.top = `${posY}px`

      cursorOutline.style.left = `${posX}px`
      cursorOutline.style.top = `${posY}px`
    })

    // Cursor interactions
    const interactiveElements = document.querySelectorAll("a, button, .project-card, .skill-card")

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorDot.style.transform = "scale(2)"
        cursorOutline.style.transform = "scale(1.5)"
      })

      el.addEventListener("mouseleave", () => {
        cursorDot.style.transform = "scale(1)"
        cursorOutline.style.transform = "scale(1)"
      })
    })
  }

  // Floating Particles
  setupParticles() {
    const particlesContainer = document.getElementById("particles")
    if (!particlesContainer) return

    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.animationDelay = Math.random() * 20 + "s"
      particle.style.animationDuration = Math.random() * 10 + 10 + "s"
      particlesContainer.appendChild(particle)
    }
  }

  // Initialize Lucide Icons
  initializeLucideIcons() {
    if (typeof lucide !== "undefined") {
      lucide.createIcons()
    }
  }

  // Theme Toggle Functionality
  setupThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle")
    if (!themeToggle) return

    const currentTheme = localStorage.getItem("theme") || "light"
    document.documentElement.setAttribute("data-theme", currentTheme)

    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme")
      const newTheme = currentTheme === "dark" ? "light" : "dark"

      document.documentElement.setAttribute("data-theme", newTheme)
      localStorage.setItem("theme", newTheme)

      // Enhanced animation
      themeToggle.style.transform = "scale(0.9) rotate(180deg)"
      setTimeout(() => {
        themeToggle.style.transform = "scale(1) rotate(0deg)"
      }, 300)
    })
  }

  // Navigation and Smooth Scrolling
  setupNavigation() {
    const navLinks = document.querySelectorAll(".nav-link")

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()

        navLinks.forEach((navLink) => navLink.classList.remove("active"))
        link.classList.add("active")

        const targetId = link.getAttribute("href").substring(1)
        const targetSection = document.getElementById(targetId)

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 100
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      })
    })

    window.addEventListener("scroll", () => {
      this.updateActiveNavigation()
      this.handleScrollAnimations()
    })
  }

  updateActiveNavigation() {
    const sections = document.querySelectorAll(".section")
    const navLinks = document.querySelectorAll(".nav-link")
    const scrollPosition = window.scrollY + 150

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"))
        const activeLink = document.querySelector(`[href="#${sectionId}"]`)
        if (activeLink) {
          activeLink.classList.add("active")
        }
      }
    })
  }

  // Scroll Effects and Animations
  setupScrollEffects() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up")

          // Animate timeline items
          if (entry.target.classList.contains("timeline-item")) {
            entry.target.classList.add("animate")
          }

          // Animate skill bars
          if (entry.target.classList.contains("skill-card")) {
            this.animateSkillBar(entry.target)
          }
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll(
      ".project-card, .skill-card, .timeline-item, .education-card, .contact-card",
    )
    animatedElements.forEach((el) => observer.observe(el))
  }

  handleScrollAnimations() {
    const scrolled = window.pageYOffset
    const profileImage = document.querySelector(".profile-image-container")

    if (profileImage) {
      const rate = scrolled * -0.3
      profileImage.style.transform = `translateY(${rate}px)`
    }
  }

  // Typing Animation
  startTypingAnimation() {
    const typingElement = document.getElementById("typing-text")
    if (!typingElement) return

    const typeText = () => {
      const currentText = this.typingTexts[this.currentTextIndex]

      if (this.isDeleting) {
        typingElement.textContent = currentText.substring(0, this.currentCharIndex - 1)
        this.currentCharIndex--

        if (this.currentCharIndex === 0) {
          this.isDeleting = false
          this.currentTextIndex = (this.currentTextIndex + 1) % this.typingTexts.length
          setTimeout(typeText, 500)
          return
        }

        setTimeout(typeText, this.deletingSpeed)
      } else {
        typingElement.textContent = currentText.substring(0, this.currentCharIndex + 1)
        this.currentCharIndex++

        if (this.currentCharIndex === currentText.length) {
          this.isDeleting = true
          setTimeout(typeText, this.pauseTime)
          return
        }

        setTimeout(typeText, this.typingSpeed)
      }
    }

    typeText()
  }

  // Skill Bar Animation
  animateSkillBars() {
    const skillBars = document.querySelectorAll(".level-fill")

    skillBars.forEach((bar) => {
      const level = bar.getAttribute("data-level")
      setTimeout(() => {
        bar.style.width = level + "%"
      }, 500)
    })
  }

  animateSkillBar(skillCard) {
    const levelFill = skillCard.querySelector(".level-fill")
    if (levelFill) {
      const level = levelFill.getAttribute("data-level")
      levelFill.style.width = level + "%"
    }
  }

  // Project Filter
  setupProjectFilter() {
    // Project action buttons
    const actionBtns = document.querySelectorAll(".action-btn")
    actionBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation()
        const action = btn.getAttribute("data-action")

        switch (action) {
          case "preview":
            this.showNotification("Preview feature coming soon!", "info")
            break
          case "code":
            this.showNotification("GitHub repository will be available soon!", "info")
            break
          case "live":
            this.showNotification("Live demo coming soon!", "success")
            break
        }
      })
    })
  }

  // Magnetic Buttons
  setupMagneticButtons() {
    const magneticBtns = document.querySelectorAll(".btn-magnetic")

    magneticBtns.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
      })

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0px, 0px)"
      })
    })
  }

  // Form Handling with EmailJS Integration
  setupFormHandling() {
    const contactForm = document.getElementById("contact-form")

    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
        this.handleFormSubmission(contactForm)
      })

      // Enhanced form interactions
      const inputs = contactForm.querySelectorAll("input, textarea")
      inputs.forEach((input) => {
        input.addEventListener("focus", (e) => {
          e.target.parentElement.classList.add("focused")
        })

        input.addEventListener("blur", (e) => {
          if (!e.target.value) {
            e.target.parentElement.classList.remove("focused")
          }
        })
      })
    }
  }

  // Updated Form Submission with EmailJS
  handleFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    // Enhanced loading state
    submitBtn.innerHTML = '<i data-lucide="loader-2"></i> Sending...'
    submitBtn.disabled = true
    submitBtn.style.transform = "scale(0.95)"

    // Prepare template parameters for EmailJS
    const templateParams = {
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
      to_email: "abdeldjalildahnoun@gmail.com", // Your email
    }

    // Send email using EmailJS
    if (typeof emailjs !== "undefined") {
      emailjs
        .send(
          "service_jrxvsbl", // Replace with your actual service ID
          "template_o1gzz5m", // Replace with your actual template ID
          templateParams,
        )
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text)
          this.showNotification("Thank you for your message! I'll get back to you soon.", "success")

          form.reset()

          // Remove focused states
          const focusedGroups = form.querySelectorAll(".form-group.focused")
          focusedGroups.forEach((group) => group.classList.remove("focused"))
        })
        .catch((error) => {
          console.error("FAILED...", error)
          this.showNotification("Sorry, there was an error sending your message. Please try again.", "error")
        })
        .finally(() => {
          // Reset button with animation
          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
          submitBtn.style.transform = "scale(1)"

          this.initializeLucideIcons()
        })
    } else {
      console.warn("EmailJS is not defined. Ensure it is properly loaded.")
      this.showNotification("EmailJS is not loaded. Please check your configuration.", "error")
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
      submitBtn.style.transform = "scale(1)"
    }
  }

  // Enhanced Notification System
  showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
      <div class="notification-content">
        <i data-lucide="${type === "success" ? "check-circle" : type === "error" ? "x-circle" : "info"}"></i>
        <span>${message}</span>
      </div>
    `

    document.body.appendChild(notification)

    if (typeof lucide !== "undefined") {
      lucide.createIcons()
    }

    // Enhanced animation
    setTimeout(() => {
      notification.style.transform = "translateX(0) scale(1)"
      notification.style.opacity = "1"
    }, 100)

    // Auto remove with fade out
    setTimeout(() => {
      notification.style.transform = "translateX(100%) scale(0.8)"
      notification.style.opacity = "0"
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 300)
    }, 5000)
  }

  // Setup Enhanced Animations
  setupAnimations() {
    // Enhanced hover effects
    this.setupEnhancedHoverEffects()
  }

  setupEnhancedHoverEffects() {
    const cards = document.querySelectorAll(
      ".project-card, .skill-card, .timeline-content, .education-card, .contact-card",
    )

    cards.forEach((card) => {
      card.addEventListener("mouseenter", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        card.style.transformOrigin = `${x}px ${y}px`
        card.style.transform = "scale(1.02)"
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)"
        card.style.transformOrigin = "center center"
      })
    })
  }
}

// Initialize Portfolio when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Portfolio()
})

// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    if (typeof lucide !== "undefined") {
      lucide.createIcons()
    }
  }
})

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = Portfolio
}
