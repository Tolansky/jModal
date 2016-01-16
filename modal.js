
//jQuery addon function (template available at jQuery.com)
(function ( $ ) {
 
    $.fn.modal = function( options )
    {
        //The default settings, can be overridden
        var settings = $.extend(
          {
            ///////////////////
            // Core contents
            target: this,                   // OPTIONAL - pull contents from the jQuery identified element
            content: '',                    // OPTIONAL - put contents in manually
            
            // NOTE - content overrules target if they both have values.
            
            
            ///////////////////
            // Appearance
            width:400,                      // width of the popup
            
            ///////////////////
            //Behaviour
            fadeTime: 400,                  // fade in/out time
            addCloseButton: true,           // Add a close button or not
            closeOnOverlayClick: true,      // close modal on click of the overlay
            showOverlay: true,              // show the overlay (click away doesn't work if not)
            
            ///////////////////
            //IDs
            overlayID: "TL_ModalBack",      // id to use for the overlay element - usually not necessary to change
            newElementID: "TL_ModalFront"   // id to use for the modal element - usually not necessary to change
          }, options );

          
        //////////////////////////////////////////////////////////////////////////////////////////////
        // Build the contents
        //////////////////////////////////////////////////////////////////////////////////////////////

        //Define the html for the close button that might be added to the popup
        var closeButton = "<div align='right' width='100%' style='color:black; font-size:10px'><span id='TL_ClosePopup'>CLOSE</span></div><br>";
      
        //Define the contents of the popup
        var popupContents = "";
        if (settings.addCloseButton) { popupContents += closeButton;                    }   // add a close button
        if (settings.content != '')   { popupContents += settings.content;              }   // add the passed in string if applicable
        if (settings.content == '')    { popupContents += $(settings.target).html();    }   // add html from the passed in object if applicable
      
      
      
        //////////////////////////////////////////////////////////////////////////////////////////////
        // Add the overlay and popup objects into the body
        //////////////////////////////////////////////////////////////////////////////////////////////
        if (settings.showOverlay)
        {
            $("body").append("<div id='" + settings.overlayID + "' class='TL_overlayStyle'></div>");                 // overlay
        }
        
        $("body").append("<div id='"+ settings.newElementID + "' class='TL_newObjectStyle'>" + popupContents + "</div>");  // popup object
        
        
        //////////////////////////////////////////////////////////////////////////////////////////////
        // settings adjustments
        //////////////////////////////////////////////////////////////////////////////////////////////
        {
            //Adjust the popup object's width based on settings
            $("#" + settings.newElementID).css("width",settings.width);
            $("#" + settings.newElementID).css("marginLeft",0-(settings.width/2));            
        }
      
        
        //////////////////////////////////////////////////////////////////////////////////////////////
        //Event handling
        //////////////////////////////////////////////////////////////////////////////////////////////
        //Add event handlers to the overlay and close button (which close them both)
        if (settings.closeOnOverlayClick)
        {
            // Close action on overlay            
            $("#" + settings.overlayID).click(function(){$().closeModal({overlayID: "#" + settings.newElementID, popupID: "#" + settings.TL_ModalFront, fadeTime: settings.fadeTime});})
        }
        
        //Close when clicking the close button
        $("#TL_ClosePopup").click(function(){$().closeModal({overlayID: "#" + settings.newElementID, popupID: "#" + settings.TL_ModalFront, fadeTime: settings.fadeTime});})
        
                
        //////////////////////////////////////////////////////////////////////////////////////////////
        //Appear!
        //////////////////////////////////////////////////////////////////////////////////////////////
        //Fade the overlay in, then the front popup
        $("#" + settings.overlayID).fadeIn(settings.fadeTime, function(){$("#" + settings.newElementID).fadeIn(settings.fadeTime);});
    };
    
    $.fn.closeModal = function( options )
    {
        //The default settings, can be overridden
        var settings = $.extend(
          {
            overlayID: "TL_ModalBack",      // id to use for the overlay element - usually not necessary to change
            popupID: "TL_ModalFront",       // id to use for the modal element - usually not necessary to change
            fadeTime: 400                   // time out
          }, options );
        
        // first fadeout the popup
        $(settings.popupID).fadeOut(settings.fadeTime, function()
        {
            // destroy the newly created popup
            $(settings.popupID).remove();
        
            // once the front is faded (and possibly destroyed) fade out the black
            $("#" + settings.overlayID).fadeOut(settings.fadeTime,function()
                                            {
            // once the black is faded out, destroy it (so it can be created again later)
            $("#" + settings.overlayID).remove();
        })
      });
    };
}( jQuery ));








    $("<style type='text/css'>                                                      \
    .TL_overlayStyle                                                                   \
    {                                                                               \
        z-index: 1004;                                                              \
        position:fixed;                                                             \
        width:100%;                                                                 \
        height:100%;                                                                \
        top:0;                                                                      \
        left:0;                                                                     \
        background: rgba(0,0,0,0.6);                                                \
        display: none;                                                              \
    }                                                                               \
    \
    .TL_newObjectStyle                                                                 \
    {                                                                               \
        z-index: 1005;                                                              \
        position: fixed;                                                            \
        top: 15%;                                                                   \
        left: 50%;                                                                  \
        max-width: 100%;                                                            \
                                                                                    \
        padding:20px;                                                               \
                                                                                    \
        background:white;                                                           \
        color:#777;                                                                 \
        font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;            \
        font-size: 14px;                                                            \
        text-align:justify;                                                         \
        border-radius:3px;                                                          \
        box-shadow: 7px 7px 15px #333;                                              \
\
        display:none;                                                               \
 \
    }                                                                               \
    \
    \
    #TL_ClosePopup                                                             \
    {                                                                               \
        padding:3px 5px 3px 5px;                                                    \
        border-radius:5px;                                                          \
        cursor:pointer;                                                             \
    }                                                                               \
    #TL_ClosePopup:hover                                                       \
    {                                                                               \
        color:white;                                                                \
        background:#555;                                                            \
    }                                                                               \
    \
    </style>").appendTo("head");                                               
