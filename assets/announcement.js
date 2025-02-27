document.addEventListener('DOMContentLoaded', function () {
  const dismissBtn = document.getElementById('dismiss-announcement');
  const announcementBar = document.getElementById('announcement-bar');

  if (dismissBtn && announcementBar) {
    dismissBtn.addEventListener('click', function () {
      announcementBar.style.display = 'none';
    });
  }
});
