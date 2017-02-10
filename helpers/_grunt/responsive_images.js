module.exports = {
	"homeslider": {
		options: {
			sizes: [
				
				{
					name: '768',
					width: 768,
					quality: 80
				},
				{
					name: '768_2x',
					width: 1536,
					quality: 40
				},
				{
					name: '1024',
					width: 1024,
					quality: 80
				},
				{
					name: '1024_2x',
					width: 2048,
					quality: 40
				},
				{
					name: "1440",
					width: 1920,
					quality: 80
				},
				{
					name: '1440_2x',
					width: 2880,
					quality: 40
				},
				{
					name: "1920",
					width: 1920,
					quality: 80
				},
				{
					name: '1920_2x',
					width: 3840,
					quality: 40
				}
			]
		},
		files: [
			{
				expand: true,
				src: ['**.{jpg,gif,png}'],
				cwd: '<%= paths.src %>/assets/img/original/homeslider/',
				dest: '<%= paths.src %>/assets/img/resized/homeslider/'
			}
		]
	},
	"articles": {
		options: {
			sizes: [
				{
					name: '1920',
					width: 1236,
					height: 824,
					quality: 80
				},
				{
					name: '1920_2x',
					width: 2472,
					height: 1648,
					quality: 40
				},
				{
					name: '1440',
					width: 1040,
					height: 694,
					quality: 80
				},{
					name: '1440_2x',
					width: 2080,
					height: 1388,
					quality: 40
				},
				{
					name: '1024',
					width: 740,
					height: 492,
					quality: 80
				},
				{
					name: '1024_2x',
					width: 1480,
					height: 984,
					quality: 40
				},
				{
					name: '768',
					width: 533,
					height: 356,
					quality: 80
				},
				{
					name: '768_2x',
					width: 1066,
					height: 712,
					quality: 40
				}
			]
		},
		files: [
			{
				expand: true,
				aspectRatio: true,
				src: ['**.{jpg,gif,png}'],
				cwd: '<%= paths.src %>/assets/img/original/articles/',
				dest: '<%= paths.src %>/assets/img/resized/articles/'
			}
		]
	}
};