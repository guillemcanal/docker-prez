/* global module:false */
module.exports = function(grunt) {
	var hostname = grunt.option('hostname') || '0.0.0.0';
	var port = grunt.option('port') || 9000;
	var base = grunt.option('base') || '.';

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner:
			'/*!\n' +
			' * reveal.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
			' * http://lab.hakim.se/reveal-js\n' +
			' * MIT licensed\n' +
			' *\n' +
			' * Copyright (C) 2016 Hakim El Hattab, http://hakim.se\n' +
			' */'
		},

		uglify: {
			options: {
				banner: '<%= meta.banner %>\n'
			},
			build: {
				src: 'js/reveal.js',
				dest: 'js/reveal.min.js'
			}
		},

		sass: {
			core: {
				files: {
					'css/reveal.css': 'css/reveal.scss',
				}
			},
			themes: {
				files: [
				{
					expand: true,
					cwd: 'css/theme/source',
					src: ['*.scss'],
					dest: 'css/theme',
					ext: '.css'
				}
				]
			}
		},

		autoprefixer: {
			dist: {
				src: 'css/reveal.css'
			}
		},

		cssmin: {
			compress: {
				files: {
					'css/reveal.min.css': [ 'css/reveal.css' ]
				}
			}
		},

		connect: {
			server: {
				options: {
					hostname: hostname,
					port: port,
					base: '.',
					livereload: true
				}
			}
		},

		zip: {
			'reveal-js-presentation.zip': [
			'index.html',
			'css/**',
			'js/**',
			'lib/**',
			'images/**',
			'plugin/**',
			'**.md'
			]
		},

		watch: {
			options: {
				livereload: true
			},
			html: {
				files: [ 'index.html']
			},
			markdown: {
				files: [ './slides/*.md' ]
			}
		}

	});

	// Dependencies
	grunt.loadNpmTasks( 'grunt-contrib-qunit' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-autoprefixer' );
	grunt.loadNpmTasks( 'grunt-zip' );

	// Default task
	grunt.registerTask( 'default', [ 'css', 'js' ] );

	// JS task
	grunt.registerTask( 'js', [ 'jshint', 'uglify', 'qunit' ] );

	// Theme CSS
	grunt.registerTask( 'css-themes', [ 'sass:themes' ] );

	// Core framework CSS
	grunt.registerTask( 'css-core', [ 'sass:core', 'autoprefixer', 'cssmin' ] );

	// All CSS
	grunt.registerTask( 'css', [ 'sass', 'autoprefixer', 'cssmin' ] );

	// Package presentation to archive
	grunt.registerTask( 'package', [ 'default', 'zip' ] );

	// Serve presentation locally
	grunt.registerTask( 'serve', [ 'connect', 'watch' ] );

	// Build a nice PDF
	grunt.registerTask( 'pdf', function () {

		var childProcess = require('child_process'),
			binPath = 'phantomjs',
			done = grunt.task.current.async();

		var childArgs = [
			'plugin/print-pdf/print-pdf.js',
			'http://'+hostname+':'+port+'?print-pdf',
			'build/slide.pdf'
		];

		childProcess.execFile(binPath, childArgs, function (error, stdout, stderr) {
			grunt.log.writeln(stdout);
			done(error);
		});
	});

};
