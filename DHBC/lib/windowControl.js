'use strict';

var electron = require('electron');
var app = electron.app;
var ipcMain = electron.ipcMain;
var dialog = electron.dialog;
var BrowserWindow = electron.BrowserWindow;

var winControl = {
	mainWindow: null,
	playWindow: null,

	// Create and display the main window
	showMainWindow: function() {
		this.mainWindow = new BrowserWindow({width: 800, height: 600, show: false});
		this.mainWindow.loadURL('file://' + __dirname + '/../contents/main_window/index.html');

		// Close all other windows when hidden
		this.mainWindow.on('closed', () => {
			console.log('main window closed.');
			this.mainWindow = null;
		});

		this.mainWindow.once('ready-to-show', () => {
			this.mainWindow.show();
		});
	},

	// Create and display album window. Specify an image to display as an argument
	showPlayWindow: function() {
		var win = new BrowserWindow({width: 600, height: 600, useContentSize: true, show: false, frame: true, x:900, y:200});
		win.loadURL('file://' + __dirname + '/../contents/play_window/index.html');

		// win.on('closed', () => {
		// 	console.log('album window closed.');
		// 	let idx = this.albumWindows.indexOf(win);
		// 	if ( idx >= 0 ) {
		// 		this.albumWindows.splice(idx, 1);
		// 	}
		// });

		// If an image is specified, notify the path of the image after loading the content
		// if ( album ) {
		// 	win.webContents.on('did-finish-load', () => {
		// 		console.log('did-finish-load');
		// 		win.webContents.executeJavaScript(`setContent("${album}");`);
		// 	});
		// }

		// win.once('ready-to-show', () => {
		// 	console.log('ready-to-show');
		// 	win.show();
		// });

		// this.albumWindows.push(win);
	}
};

module.exports = winControl;

