import html2canvas from 'html2canvas-webpack'

const screenGrabMixin = {
    methods: {
        screenGrab: function() {
            debugger

            // Only do this if an openFin environment
            if ( fin.desktop === undefined )
            {
                return
            }

            html2canvas(document.body)
                .then(canvas => {
      
              debugger
      
              var newWindow = window.open()
              newWindow.document.body.appendChild(canvas)
            })
            .catch(error => {
                console.log(error)
            });
          }
          }
}

export default screenGrabMixin;