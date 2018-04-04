(function($, window) {

  'use strict';

  var $win = $(window),
      viewMode = 'desktop';


  /*
   * Syntax Highlighting (prettyprint)
   */
  if( $win.width() < 600 ) {
      $('.linenums').removeClass('linenums');
  }
  $('.convert-code').each(function() {
      var html = this.innerHTML;
      $(this)
          .html('')
          .text($.trim(html))
          .show();
  });
  if( navigator.userAgent.indexOf('MSIE') > -1 ) {
      $('.prettyprint').addClass('linenums'); // IE must have line numbers or line breaks will disappear
  }
  $('.prettyprint').each(function() {
      var code = $(this).text().replace(new RegExp('    ', 'g'), '  ');
      code = code.replace(new RegExp('break[0-9]?=""', 'gi'), '\n\t\t');
      $(this).text( code );
  });
  prettyPrint();

  /*
   * Download curtain
   */
  var $downloadInfo = $('#download-info');
  $('#download-link').click(function(evt) {
      if( $downloadInfo.is(':visible') ) {
          $(this).removeClass('active');
          $downloadInfo.slideUp();
      } else {
          $(this).addClass('active');
          $downloadInfo.slideDown();
      }
      return false;
  });

  /*
   * Links on front page that opens download curtain
   */
  $('#home').find('.click-download').click(function() {
      $('#download-link').trigger('click');
      return false;
  });

  /*
   * Register page views at ga
   */
  $win.on('hashchange', function() {
      var url = window.location.pathname + window.location.search + window.location.hash;
      if( typeof window.ga == 'function' ) {
          ga('send', 'pageview', url);
      } else {
          console.log('Would register page view for '+url+' in production');
      }
      if( viewMode == 'mobile' ) {
          if( $('#side-col').is(':visible') ) {
              $('.nav-toggle').trigger('click');
          }
      }
  });

  /*
   * Advertisement
   */
  $win.on('beforePageChange', function(evt, page, args, pageSection) {
    if( !Pager.isFirstLoad && !pageSection ) {

    var $adWrapper = $('#ad-wrapper');
      $adWrapper
        .css('height', $adWrapper.height()+'px')
        .html('<div id="carbonads-container"><div class="carbonad"><div id="azcarbon"></div><script async type="text/javascript" src="//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=formvalidatornet" id="_carbonads_js"></script></div></div>');

      setTimeout(function() {
        $adWrapper.css('height', 'auto');
        $adWrapper.find('img').on('load', function() {
          $adWrapper.css('height', 'auto');
        })
      }, 1000);
    }
  });


  /*
   * Profile pictures
   */
  var hasLoadedProfilePics = false;
  $win.on('pageChange', function(evt, page, args, pageSection) {
      if( !hasLoadedProfilePics && page == 'credits' ) {
          var $container = $('#contribs');
          $.get('https://api.github.com/repos/victorjonsson/jQuery-Form-Validator/contributors', function(users) {
              $.each(users, function(i, user) {
                  var html = '<a class="profile" href="'+user.html_url+'" target="_blank"><img src="'+
                      user.avatar_url +'" class="profile-pic" />@'+user.login+'</a>';

                  if (user.login == 'victorjonsson') {
                      $('#maintainer').append(html);
                  } else {
                      $container.append(html);
                  }
              });
          });
      }
  });

  /*
   * Preload some images that is used in the form
   */
  $.each(['static/img/icon-fail.png', 'static/img/icon-ok.png'], function(i, imgSource) {
      $('<img />')
          .css({
              position : 'absolute',
              top: '-100px',
              left: '-100px'
          })
          .appendTo('body')
          .get(0).src = imgSource;
  });

  /*
   * Setup form validation
   */
  $.validate({
      form : '.test-form:not(.top-messages)',
      modules : 'date, security, location, date, sweden, uk, file, toggleDisabled',
      disabledFormFilter : 'form.toggle-disabled',
      showErrorDialogs : false, // only used by toggleDisabled module
      onModulesLoaded: function($form) {
          $('input[name="country"]').suggestCountry();
          $('input[name="state"]').suggestState();
          $('input[name="lan"]').suggestSwedishCounty();
          $('input[name="kommun"]').suggestSwedishMunicipality();
          $('input[name="pass_confirmation"]').displayPasswordStrength();
      },
      onError : function() {

      },
      onSuccess: function($form) {

          // if "validate_backend" is encountered the form will be validated
          // twice, the first time $.formUtils.haltValidation will be set to true
          if( !$.formUtils.haltValidation ) {
              alert('Form is valid :)');

              // The input button is disabled if the form contains backend validations
              $form.find('input[type="submit"]').unbind('click');
          }
          return false;
      }
  });

  // Setup form validation with error messages in top
  $.validate({
      form : '.test-form.top-messages',
      scrollToTopOnError: false,
      validateOnBlur: false,
      errorMessagePosition: 'top',
      onSuccess : function() {
          alert('The form is valid :)');
          return false;
      }
  });

  // Length restrictions
  $('.length-restricted').each(function() {
      var $maxLen = $(this).parent().parent().parent().find('.max-chars');
      $(this).restrictLength($maxLen);
  });

  // Bind card type to card number validator
  $('#ccard').on('change', function() {
      var card = $(this).val();
      $('input[name="ccard_num"]').attr('data-validation-allowing', card);
  });

  // Responsive stuff
  $win.on('viewModeChange', function(evt, newMode) {
      viewMode = newMode;
  });


  /*
   * Search engine
   */
  var docs = {},
    lunrIndex = lunr(function () {
      this.field('title');
      this.field('body');
      this.ref('id');
    });

  $('div.page').each(function() {
    var parts = $(this).html().split('<h3 '),
      parentSectionPrefix =  $(this).attr('id');

    $.each(parts, function(i, data) {
      if( data.indexOf('page-section="') > -1 ) {
        try {
          var h3Title = $.trim(data.split('>')[0].split('data-page-section="')[1].split('"')[0]);
          if( h3Title ) {
            var txt = $('<div>'+data.substr(data.indexOf('</h3>'), data.length)+'</div>').text(),
              id = parentSectionPrefix+'_'+h3Title.split(':')[0],
              title = h3Title.split(':')[1];

            txt = $('<div>'+txt+'</div>').text();

            lunrIndex.add({
              id: id,
              title: title,
              body: txt
            });
            docs[id] = {
              title : title,
              txt : txt
            };
          }
        } catch(e) {}
      }
    });
  });

  var $searchPage = $('#lunr'),
      $searchResult = $('#lunr-search-result'),
      $searchButtons = $('.lunr-search-btn'),
      captureEnterButtonHit = function(evt) {
        if( evt.keyCode == 13 ) {
          $(evt.target)
            .trigger('blur')
            .closest('.lunr-search-wrapper')
              .find('.lunr-search-btn')
                .trigger('click');
        }
      };


  $searchButtons
    .on('click', function() {
      var s = $(this).closest('.lunr-search-wrapper').find('input[type="search"]').val(),
        doSearch = function() {

          $searchPage.find('input[type="search"]').val(s);
          $searchResult.empty();

          var result = lunrIndex.search(s).splice(0, 50),
              tmpl = '<div class="search-result"><hr /><h4 style="font-size: 25px">%TITLE%</h4><p>%TEXT%</p></div>';

          if( result.length == 0 ) {
            $searchResult.html( tmpl.replace('%TITLE%', '').replace('%TEXT%', '<em>No result found...</em>'));
          } else {
            $.each(result, function(i, obj) {
              var doc = docs[obj.ref],
                item = tmpl.replace('%TITLE%', doc.title),
                itemTxtSize = 230;

              item = item.replace('%TEXT%', '<a href="#'+obj.ref+'">'+doc.txt.substr(0, itemTxtSize)+'...</a>');
              $searchResult.append(item);
            });
          }
        };

      if( s ) {
        if( window.Pager.currentPage == 'lunr' ) {
          doSearch();
        } else {
          window.Pager.goTo('lunr_search', doSearch);
        }
      }
    })
    .each(function() {
      $(this).closest('.lunr-search-wrapper').find('input[type="search"]')
        .on('focus', function() {
          $win.on('keydown', captureEnterButtonHit);
        })
        .on('blur', function() {
          $win.off('keydown', captureEnterButtonHit);
        });
    });

})(jQuery, window);