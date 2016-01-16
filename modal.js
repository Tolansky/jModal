
//jQuery addon function (template available at jQuery.com)
(function ( $ ) {
 
    $.fn.modal = function( options )
    {
        //The default settings, can be overridden
        var settings = $.extend(
          {
            // Core contents.
            target: this,
            content: '',
            
            // Appearance
            width:400,
            
            //Behaviour
            fadeTime: 400,            
            addCloseButton: true,
            closeOnOverlayClick: true,
            showOverlay: true,
            
            //IDs
            overlayID: "TL_ModalBack",
            newElementID: "TL_ModalFront"
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
            $("#" + settings.overlayID).click(function(){closeModal("#" + settings.newElementID, settings.fadeTime);})
        }
        
        //Close when clicking the close button
        $("#TL_ClosePopup").click(function(){closeModal("#" + settings.newElementID, settings.fadeTime);})
        
                
        //////////////////////////////////////////////////////////////////////////////////////////////
        //Appear!
        //////////////////////////////////////////////////////////////////////////////////////////////
        //Fade the overlay in, then the front popup
        $("#" + settings.overlayID).fadeIn(settings.fadeTime, function(){$("#" + settings.newElementID).fadeIn(settings.fadeTime);});
    }; 
}( jQuery ));






//close the modal - this is called by clicking the close button or on the overlay
function closeModal(id, fadeTime)
{
  // first fadeout the popup
  $(id).fadeOut(fadeTime, function()
                {

    // destroy the newly created popup
    $(id).remove();

    // once the front is faded (and possibly destroyed) fade out the black
    $("#TL_ModalBack").fadeOut(fadeTime,function()
                                    {
      // once the black is faded out, destroy it (so it can be created again later)
      $("#TL_ModalBack").remove();
    })
  });
}


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
