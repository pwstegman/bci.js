'use strict';

$(document).ready(function () {
  // If an anchor hash is in the URL highlight the menu item
  highlightActiveHash();
  // If a specific page section is in the URL highlight the menu item
  highlightActiveSection();

  // If a specific page section is in the URL scroll that section up to the top
  // Doesn't scroll properly for sections like "Classes," so disabling for now.
  /*var currentSectionNav = document.getElementById(getCurrentSectionName() + '-nav');
  if (currentSectionNav) {
    document.getElementById('docs-nav').scrollTop = currentSectionNav.offsetTop;
  }*/

  // If they're on the readme (index.html), highlight that
  if(typeof on_index !== 'undefined' && on_index) {
    document.getElementById('readme-link').classList.add('active');
  }
});

// If a new anchor section is selected, change the hightlighted menu item
$(window).bind('hashchange', function (event) {
  highlightActiveHash(event);
});

function highlightActiveHash(event) {
  var oldUrl, oldSubSectionElement;

  // check for and remove old hash active state
  if (event && event.originalEvent.oldURL) {
    oldUrl = event.originalEvent.oldURL;

    if (oldUrl.indexOf('#') > -1) {
      oldSubSectionElement = document.getElementById(getCurrentSectionName() + '-' + oldUrl.substring(oldUrl.indexOf('#') + 2) + '-nav');

      if (oldSubSectionElement) {
        oldSubSectionElement.classList.remove('active');
      }
    }
  }

  if (getCurrentHashName()) {
    $('#' + getCurrentSectionName() + '-' + getCurrentHashName() + '-nav').addClass('active');
  }
}

function highlightActiveSection() {
  var pageId = getCurrentSectionName();

  $('#' + pageId + '-nav').addClass('active');
}

function getCurrentSectionName() {
  var path = window.location.pathname;
  var pageUrl = path.split('/').pop();

  var sectionName = pageUrl.substring(0, pageUrl.indexOf('.'));

  // remove the wodr module- if its in the url
  sectionName = sectionName.replace('module-', '');

  return sectionName;
}

function getCurrentHashName() {
  var pageSubSectionId;
  var pageSubSectionHash = window.location.hash;

  if (pageSubSectionHash) {
    pageSubSectionId = pageSubSectionHash.substring(1).replace('.', '');

    return pageSubSectionId;
  }

  return false;
}
