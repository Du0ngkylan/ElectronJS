'use strict';

var electron = require('electron');
var app = electron.app;
var ipcMain = electron.ipcMain;
var dialog = electron.dialog;
var BrowserWindow = electron.BrowserWindow;

var winControl = {
	mainWindow: null,
	sidemenuWindow: null,
	autocloseWindow: null,
	albumWindows: [],

	// Create and display the main window
	showMainWindow: function() {
		this.mainWindow = new BrowserWindow({width: 800, height: 600, show: false});
		this.mainWindow.loadURL('file://' + __dirname + '/../contents/win_main.html');

		// Close all other windows when hidden
		this.mainWindow.on('closed', () => {
			console.log('main window closed.');
			if (this.sidemenuWindow) {
				this.sidemenuWindow.close();
			}
			while( this.albumWindows.length ) {
				this.albumWindows.shift().close();
			}
			this.mainWindow = null;
		});

		this.mainWindow.once('ready-to-show', () => {
			this.mainWindow.show();
		});
	},

	// Create and display side menu window
	showSidemenuWindow: function() {
		// Launch browser (Chromium), load initial screen
		this.sidemenuWindow = new BrowserWindow({width: 250, height: 500, useContentSize: true, show: false, frame: true, x:30, y:200});
		this.sidemenuWindow.loadURL('file://' + __dirname + '/../contents/win_sidemenu.html');

		this.sidemenuWindow.on('closed', () => {
			console.log('sidemenu window closed.');
			this.sidemenuWindow = null;
		});

		this.sidemenuWindow.once('ready-to-show', () => {
			this.sidemenuWindow.show();
		});
	},

	// Creating and displaying setting windows
	showAutocloseWindow: function() {
		this.autocloseWindow = new BrowserWindow({parent: this.mainWindow, width: 705, height: 543, show: false, frame: false, x:100, y:400});
		this.autocloseWindow.loadURL('file://' + __dirname + '/../contents/win_autoclose.html');

		this.autocloseWindow.once('ready-to-show', () => {
			this.autocloseWindow.show();
			if ( !this.autocloseWindow.isFocused() )
			{
				this.autocloseWindow.close();
			}
		});

		// Automatically close when the focus of the window is lost
		this.autocloseWindow.on('blur', () => {
			this.autocloseWindow.close();
		});
	},

	// Create and display album window. Specify an image to display as an argument
	showAlbumWindow: function(album) {
		var win = new BrowserWindow({width: 600, height: 600, useContentSize: true, show: false, frame: true, x:900, y:200});
		win.loadURL('file://' + __dirname + '/../contents/win_album.html');

		win.on('closed', () => {
			console.log('album window closed.');
			let idx = this.albumWindows.indexOf(win);
			if ( idx >= 0 ) {
				this.albumWindows.splice(idx, 1);
			}
		});

		// If an image is specified, notify the path of the image after loading the content
		if ( album ) {
			win.webContents.on('did-finish-load', () => {
				console.log('did-finish-load');
				win.webContents.executeJavaScript(`setContent("${album}");`);
			});
		}

		win.once('ready-to-show', () => {
			console.log('ready-to-show');
			win.show();
		});

		this.albumWindows.push(win);
	}
};

module.exports = winControl;

