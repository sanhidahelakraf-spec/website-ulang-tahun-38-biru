
document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // 1. ELEMEN MUSIK DAN HALAMAN PEMBUKA
  // =========================================

  const introScreen = document.getElementById("introScreen");
  const openSurprise = document.getElementById("openSurprise");

  const music = document.getElementById("music");
  const musicToggle = document.getElementById("musicToggle");
  const musicLabel = document.getElementById("musicLabel");

  // Memulai musik setelah pengunjung menekan tombol kejutan.
  openSurprise.addEventListener("click", async () => {
    introScreen.classList.add("is-hidden");
    document.body.classList.remove("intro-open");

    try {
      await music.play();
      musicLabel.textContent = "JEDA MUSIK";
    } catch (error) {
      musicLabel.textContent = "PUTAR MUSIK";

      console.warn(
        "Musik belum dapat diputar. Periksa file assets/music.mp3.",
        error
      );
    }

    // Mengarahkan pengunjung ke halaman utama.
    document.getElementById("home").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });


  // =========================================
  // 2. TOMBOL PUTAR / JEDA MUSIK
  // =========================================

  musicToggle.addEventListener("click", async () => {
    if (music.paused) {
      try {
        await music.play();
        musicLabel.textContent = "JEDA MUSIK";
      } catch (error) {
        musicLabel.textContent = "PUTAR MUSIK";

        alert(
          "Musik belum bisa diputar. Pastikan file musik.mp3 " +
          "sudah berada di folder assets dan nama filenya benar."
        );
      }
    } else {
      music.pause();
      musicLabel.textContent = "PUTAR MUSIK";
    }
  });

  // Menyesuaikan label jika audio berhenti atau mulai diputar.
  music.addEventListener("play", () => {
    musicLabel.textContent = "JEDA MUSIK";
  });

  music.addEventListener("pause", () => {
    musicLabel.textContent = "PUTAR MUSIK";
  });


  // =========================================
  // 3. PESAN TERSEMBUNYI DI AKHIR WEBSITE
  // =========================================

  const surpriseBtn = document.getElementById("surpriseBtn");
  const surpriseMessage = document.getElementById("surpriseMessage");

  surpriseBtn.addEventListener("click", () => {
    const isOpening = surpriseMessage.hidden;

    surpriseMessage.hidden = !isOpening;

    surpriseBtn.innerHTML = isOpening
      ? "PESAN TERBUKA &nbsp; ♡"
      : "BUKA PESAN KECIL &nbsp; ↗";

    if (isOpening) {
      surpriseMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });


  // =========================================
  // 4. GALERI FOTO DAN LIGHTBOX
  // =========================================

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  // Membuka foto ketika kartu galeri diklik.
  document.querySelectorAll(".gallery-card").forEach((card) => {
    card.addEventListener("click", () => {
      const image = card.querySelector("img");

      // Jika foto belum tersedia, tampilkan petunjuk.
      if (!image || image.style.display === "none") {
        alert(
          "Foto belum ditemukan. Masukkan foto kalian ke folder " +
          "assets/foto dengan nama file yang sesuai."
        );
        return;
      }

      lightboxImg.src = card.dataset.photo;
      lightboxCaption.textContent = card.dataset.caption || "";

      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  // Menutup lightbox dan mengembalikan halaman.
  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  lightboxClose.addEventListener("click", closeLightbox);

  // Tutup jika pengunjung menekan area di luar foto.
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // Tutup dengan tombol Escape pada keyboard.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
  
  // =========================================
  // 5. VIDEO SURPRISE DAN MUSIK LATAR
  // =========================================

  const birthdayVideo = document.getElementById("birthdayVideo");

  if (birthdayVideo) {
    let resumeMusicAfterVideo = false;

    birthdayVideo.addEventListener("play", () => {
      resumeMusicAfterVideo = !music.paused;

      if (resumeMusicAfterVideo) {
        music.pause();
      }
    });

    function finishBirthdayVideo() {
      if (resumeMusicAfterVideo) {
        music.play().catch(() => {
          musicLabel.textContent = "PUTAR MUSIK";
        });
      }

      resumeMusicAfterVideo = false;
    }

    birthdayVideo.addEventListener("ended", finishBirthdayVideo);
    birthdayVideo.addEventListener("pause", () => {
      if (!birthdayVideo.ended) {
        finishBirthdayVideo();
      }
    });
  }

});
