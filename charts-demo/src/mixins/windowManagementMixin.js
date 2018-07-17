import html2canvas from 'html2canvas-webpack'
import {
  undock,
  deregister
} from 'openfin-layouts';

function AllWindows(execute) {
  var app = fin.desktop.Application.getCurrent();
  app.getChildWindows(function (children) {
    children.push(app.getWindow())
    if (execute !== undefined)
      execute(children)
  });

  if (loadedApps.length > 0) {
    loadedApps.forEach(loadedApp => {
      loadedApp.getChildWindows(function (children) {
        children.push(loadedApp.getWindow())
        if (execute !== undefined)
          execute(children)
      });
    });
  }
}

let loadedApps = [];

const windowManagementMixin = {
  methods: {
    // application is the object structure
    openApp: function (application) {
      // debugger

      /*
      var app = new fin.desktop.Application({
        url: "http://localhost:8084",
        uuid: "Some Unique Id",
        name: "My Application Name",
        mainWindowOptions: {
          defaultHeight: 600,
          defaultWidth: 800,
          defaultTop: 300,
          defaultLeft: 300,
          autoShow: true
        }
      }, function () {
        console.log("Application successfully created");
        app.addEventListener('closed', event => {
          // Need to remove this from the application list
          console.log('application closed')
        })
        app.run();
        loadedApps.push(app)
      }, function (error) {
        console.log("Error creating application:", error);
      });
      */

     var win = new fin.desktop.Window(
        {
            name: "Demo App " + application,
            url: application,
            defaultWidth: 600,
            defaultHeight: 400
        },
        function() {
            win.show();
        },
        function(error) {
            console.log("Error creating window:", error);
        }
    );
    },
    undock: function () {
      // debugger

      // Only do this if an openFin environment
      if (fin.desktop === undefined) {
        return
      }

      // How do we determine if the window is part of a group or not
      undock().then(() => {
        console.log('undocked')
      }).catch(ex => {
        console.log('Failed ' + ex)
      })
    },
    showAllWindows: function () {

        var url = window.location.origin + "/windowdisplay"

        var win = new fin.desktop.Window(
            {
                name: "Window View",
                url: url,
                defaultWidth: 600,
                defaultHeight: 300,
                frame: true,
                saveWindowState: false
            },
            function() {

                // debugger

                let document = win.getNativeWindow().document
                var menu = document.getElementById("content")

                window.addEventListener("message", event=> {
                    let data = event.data

                    if ( data.action === undefined )
                        return

                    // debugger

                    let image = document.createElement("img");
                    let sourceWindow = event.source

                    image.onclick = () => { 
                        // debugger
                        sourceWindow.postMessage({action:'bringToFront'}, '*')
                        win.close(true)
                    }

                    let div = document.createElement("div");
                    div.className = 'floating'

                    let obj = JSON.parse(data.data)
                    image.src = obj;

                    div.appendChild(image)

                    // Do something with it
                    menu.appendChild(div)
                });
        

                win.show();
                win.focus();

                win.addEventListener("blurred", function () {
                    // Need to close the popup
    
                    if ( win !== undefined )
                        win.close(true)
                        
                    win = undefined
                });
    
                AllWindows(children => {
                    children.forEach(child => {
            
                        if ( child.name === win.name)
                            return

                        let nativeWindow = child.getNativeWindow();

                        try {
                            let body = child.getNativeWindow().document.body
            
                            html2canvas(body)
                              .then(canvas => {
                                let div = document.createElement("div");
                                div.className = 'floating'
                                div.appendChild(canvas)
                                menu.appendChild(div)

                                let sourceWindow = child

                                canvas.onclick = () => { 
                                    // debugger
                                    sourceWindow.restore()
                                    sourceWindow.bringToFront()
                                    win.close(true)
                                }
            
                              })
                              .catch(error => {
                                console.log(error)
                              });
                        }
                        catch( error ) {
                            // Need to take a differenent approach
                            nativeWindow.postMessage({action:'screencapture'}, '*')
                        }
                    });
                  })
            
            },
            function(error) {
                console.log("Error creating window:", error);
            }
        );
    
    }
  },
}

export default windowManagementMixin;
