import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi14() {
  return (
    <MateriLayout
      title="Assets & Media"
      intro="Working with images, fonts, audio, video, camera, dan file handling di Flutter - from basic assets to advanced media features."
    >
      <Section id="images" heading="Images">
        <Subsection id="asset-images" heading="Asset Images">
          <p>Setup assets di <code>pubspec.yaml</code>:</p>
          
          <CodeBlock language="yaml">
{`flutter:
  assets:
    - assets/images/
    - assets/icons/
    - assets/images/logo.png  # Specific file`}
          </CodeBlock>

          <CodeBlock language="dart">
{`// Display asset image
Image.asset(
  'assets/images/logo.png',
  width: 200,
  height: 200,
  fit: BoxFit.cover,
)

// With fallback
Image.asset(
  'assets/images/profile.png',
  errorBuilder: (context, error, stackTrace) {
    return Icon(Icons.error, size: 64);
  },
)`}
          </CodeBlock>
        </Subsection>

        <Subsection id="network-images" heading="Network Images">
          <CodeBlock language="dart">
{`// Basic network image
Image.network(
  'https://example.com/image.jpg',
  width: 300,
  height: 200,
  fit: BoxFit.cover,
  loadingBuilder: (context, child, loadingProgress) {
    if (loadingProgress == null) return child;
    return Center(
      child: CircularProgressIndicator(
        value: loadingProgress.expectedTotalBytes != null
            ? loadingProgress.cumulativeBytesLoaded / 
              loadingProgress.expectedTotalBytes!
            : null,
      ),
    );
  },
  errorBuilder: (context, error, stackTrace) {
    return Container(
      color: Colors.grey[300],
      child: Icon(Icons.error),
    );
  },
)

// Cached network image (install: cached_network_image)
CachedNetworkImage(
  imageUrl: 'https://example.com/image.jpg',
  placeholder: (context, url) => CircularProgressIndicator(),
  errorWidget: (context, url, error) => Icon(Icons.error),
  fit: BoxFit.cover,
)`}
          </CodeBlock>
        </Subsection>

        <Subsection id="image-picker" heading="Image Picker (Camera & Gallery)">
          <CodeBlock language="bash">
{`flutter pub add image_picker`}
          </CodeBlock>

          <CodeBlock language="dart">
{`import 'package:image_picker/image_picker.dart';
import 'dart:io';

class ImagePickerScreen extends StatefulWidget {
  @override
  State<ImagePickerScreen> createState() => _ImagePickerScreenState();
}

class _ImagePickerScreenState extends State<ImagePickerScreen> {
  File? _image;
  final ImagePicker _picker = ImagePicker();
  
  Future<void> _pickFromGallery() async {
    final XFile? image = await _picker.pickImage(
      source: ImageSource.gallery,
      maxWidth: 1800,
      maxHeight: 1800,
      imageQuality: 85,
    );
    
    if (image != null) {
      setState(() {
        _image = File(image.path);
      });
    }
  }
  
  Future<void> _pickFromCamera() async {
    final XFile? image = await _picker.pickImage(
      source: ImageSource.camera,
      maxWidth: 1800,
      maxHeight: 1800,
      imageQuality: 85,
    );
    
    if (image != null) {
      setState(() {
        _image = File(image.path);
      });
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Image Picker')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (_image != null)
              Image.file(_image!, height: 300)
            else
              Container(
                height: 300,
                color: Colors.grey[300],
                child: Icon(Icons.image, size: 100),
              ),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton.icon(
                  onPressed: _pickFromGallery,
                  icon: Icon(Icons.photo_library),
                  label: Text('Gallery'),
                ),
                SizedBox(width: 16),
                ElevatedButton.icon(
                  onPressed: _pickFromCamera,
                  icon: Icon(Icons.camera_alt),
                  label: Text('Camera'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}`}
          </CodeBlock>

          <Note type="warning">
            <strong>Permissions:</strong> Add to AndroidManifest.xml and Info.plist untuk camera & storage permissions!
          </Note>
        </Subsection>
      </Section>

      <Section id="fonts" heading="Custom Fonts">
        <p>Setup custom fonts:</p>

        <Subsection id="fonts-setup" heading="Add Fonts">
          <CodeBlock language="yaml">
{`flutter:
  fonts:
    - family: Poppins
      fonts:
        - asset: fonts/Poppins-Regular.ttf
        - asset: fonts/Poppins-Bold.ttf
          weight: 700
        - asset: fonts/Poppins-Italic.ttf
          style: italic
    
    - family: Roboto
      fonts:
        - asset: fonts/Roboto-Regular.ttf
        - asset: fonts/Roboto-Bold.ttf
          weight: 700`}
          </CodeBlock>
        </Subsection>

        <Subsection id="fonts-usage" heading="Use Custom Fonts">
          <CodeBlock language="dart">
{`// In widget
Text(
  'Hello World',
  style: TextStyle(
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: FontWeight.bold,
  ),
)

// Set default font for entire app
MaterialApp(
  theme: ThemeData(
    fontFamily: 'Poppins',
    textTheme: TextTheme(
      displayLarge: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
      bodyLarge: TextStyle(fontSize: 16),
    ),
  ),
  home: HomeScreen(),
)

// Google Fonts (install: google_fonts)
import 'package:google_fonts/google_fonts.dart';

Text(
  'Hello World',
  style: GoogleFonts.roboto(
    fontSize: 24,
    fontWeight: FontWeight.bold,
  ),
)

// Set Google Font as default
MaterialApp(
  theme: ThemeData(
    textTheme: GoogleFonts.poppinsTextTheme(),
  ),
)`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="audio" heading="Audio & Video">
        <Subsection id="audio-player" heading="Audio Player">
          <CodeBlock language="bash">
{`flutter pub add audioplayers`}
          </CodeBlock>

          <CodeBlock language="dart">
{`import 'package:audioplayers/audioplayers.dart';

class AudioPlayerScreen extends StatefulWidget {
  @override
  State<AudioPlayerScreen> createState() => _AudioPlayerScreenState();
}

class _AudioPlayerScreenState extends State<AudioPlayerScreen> {
  final AudioPlayer _audioPlayer = AudioPlayer();
  bool _isPlaying = false;
  Duration _duration = Duration.zero;
  Duration _position = Duration.zero;
  
  @override
  void initState() {
    super.initState();
    
    // Listen to player state
    _audioPlayer.onPlayerStateChanged.listen((state) {
      setState(() {
        _isPlaying = state == PlayerState.playing;
      });
    });
    
    // Listen to duration
    _audioPlayer.onDurationChanged.listen((duration) {
      setState(() {
        _duration = duration;
      });
    });
    
    // Listen to position
    _audioPlayer.onPositionChanged.listen((position) {
      setState(() {
        _position = position;
      });
    });
  }
  
  Future<void> _playPause() async {
    if (_isPlaying) {
      await _audioPlayer.pause();
    } else {
      // Play from asset
      await _audioPlayer.play(AssetSource('audio/song.mp3'));
      
      // OR play from URL
      // await _audioPlayer.play(UrlSource('https://example.com/audio.mp3'));
    }
  }
  
  Future<void> _stop() async {
    await _audioPlayer.stop();
  }
  
  Future<void> _seek(Duration position) async {
    await _audioPlayer.seek(position);
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Audio Player')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              '\${_position.toString().split('.').first} / \${_duration.toString().split('.').first}',
              style: TextStyle(fontSize: 20),
            ),
            Slider(
              value: _position.inSeconds.toDouble(),
              max: _duration.inSeconds.toDouble(),
              onChanged: (value) {
                _seek(Duration(seconds: value.toInt()));
              },
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                IconButton(
                  iconSize: 64,
                  icon: Icon(_isPlaying ? Icons.pause : Icons.play_arrow),
                  onPressed: _playPause,
                ),
                IconButton(
                  iconSize: 64,
                  icon: Icon(Icons.stop),
                  onPressed: _stop,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
  
  @override
  void dispose() {
    _audioPlayer.dispose();
    super.dispose();
  }
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="video-player" heading="Video Player">
          <CodeBlock language="bash">
{`flutter pub add video_player`}
          </CodeBlock>

          <CodeBlock language="dart">
{`import 'package:video_player/video_player.dart';

class VideoPlayerScreen extends StatefulWidget {
  @override
  State<VideoPlayerScreen> createState() => _VideoPlayerScreenState();
}

class _VideoPlayerScreenState extends State<VideoPlayerScreen> {
  late VideoPlayerController _controller;
  
  @override
  void initState() {
    super.initState();
    
    // From asset
    _controller = VideoPlayerController.asset('assets/videos/sample.mp4');
    
    // OR from network
    // _controller = VideoPlayerController.network('https://example.com/video.mp4');
    
    _controller.initialize().then((_) {
      setState(() {});
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Video Player')),
      body: Center(
        child: _controller.value.isInitialized
            ? Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  AspectRatio(
                    aspectRatio: _controller.value.aspectRatio,
                    child: VideoPlayer(_controller),
                  ),
                  VideoProgressIndicator(
                    _controller,
                    allowScrubbing: true,
                    colors: VideoProgressColors(
                      playedColor: Colors.blue,
                      bufferedColor: Colors.grey,
                    ),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      IconButton(
                        icon: Icon(
                          _controller.value.isPlaying
                              ? Icons.pause
                              : Icons.play_arrow,
                        ),
                        onPressed: () {
                          setState(() {
                            if (_controller.value.isPlaying) {
                              _controller.pause();
                            } else {
                              _controller.play();
                            }
                          });
                        },
                      ),
                      IconButton(
                        icon: Icon(Icons.stop),
                        onPressed: () {
                          _controller.seekTo(Duration.zero);
                          _controller.pause();
                        },
                      ),
                    ],
                  ),
                ],
              )
            : CircularProgressIndicator(),
      ),
    );
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="files" heading="File Handling">
        <Subsection id="file-picker" heading="File Picker">
          <CodeBlock language="bash">
{`flutter pub add file_picker`}
          </CodeBlock>

          <CodeBlock language="dart">
{`import 'package:file_picker/file_picker.dart';
import 'dart:io';

class FilePickerScreen extends StatefulWidget {
  @override
  State<FilePickerScreen> createState() => _FilePickerScreenState();
}

class _FilePickerScreenState extends State<FilePickerScreen> {
  File? _file;
  
  Future<void> _pickFile() async {
    FilePickerResult? result = await FilePicker.platform.pickFiles(
      type: FileType.custom,
      allowedExtensions: ['pdf', 'doc', 'docx'],
    );
    
    if (result != null) {
      setState(() {
        _file = File(result.files.single.path!);
      });
      
      print('File name: \${result.files.single.name}');
      print('File size: \${result.files.single.size} bytes');
    }
  }
  
  Future<void> _pickMultipleFiles() async {
    FilePickerResult? result = await FilePicker.platform.pickFiles(
      allowMultiple: true,
      type: FileType.image,
    );
    
    if (result != null) {
      List<File> files = result.paths.map((path) => File(path!)).toList();
      print('Selected \${files.length} files');
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('File Picker')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (_file != null)
              Text('Selected: \${_file!.path.split('/').last}')
            else
              Text('No file selected'),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _pickFile,
              child: Text('Pick File'),
            ),
            ElevatedButton(
              onPressed: _pickMultipleFiles,
              child: Text('Pick Multiple'),
            ),
          ],
        ),
      ),
    );
  }
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="path-provider" heading="Path Provider (Local Storage)">
          <CodeBlock language="bash">
{`flutter pub add path_provider`}
          </CodeBlock>

          <CodeBlock language="dart">
{`import 'package:path_provider/path_provider.dart';
import 'dart:io';

class FileStorageExample {
  // Get directories
  Future<String> get _localPath async {
    final directory = await getApplicationDocumentsDirectory();
    return directory.path;
  }
  
  Future<File> get _localFile async {
    final path = await _localPath;
    return File('\$path/data.txt');
  }
  
  // Write file
  Future<File> writeFile(String content) async {
    final file = await _localFile;
    return file.writeAsString(content);
  }
  
  // Read file
  Future<String> readFile() async {
    try {
      final file = await _localFile;
      final contents = await file.readAsString();
      return contents;
    } catch (e) {
      return '';
    }
  }
  
  // Delete file
  Future<void> deleteFile() async {
    final file = await _localFile;
    await file.delete();
  }
  
  // Get temp directory
  Future<Directory> getTempDirectory() async {
    return await getTemporaryDirectory();
  }
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li> Compress images before upload (use flutter_image_compress)</li>
          <li> Cache network images untuk better performance</li>
          <li> Use appropriate image formats (WebP for better compression)</li>
          <li> Always dispose audio/video players</li>
          <li> Handle permissions properly (camera, storage, microphone)</li>
          <li> Show loading states untuk async media operations</li>
          <li> Test on different screen sizes & densities</li>
          <li> Validate file types before processing</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li> Image.asset() untuk local images, Image.network() untuk remote</li>
          <li> image_picker untuk camera & gallery access</li>
          <li> Custom fonts via pubspec.yaml atau google_fonts</li>
          <li> audioplayers untuk audio playback</li>
          <li> video_player untuk video playback</li>
          <li> file_picker untuk document selection</li>
          <li> path_provider untuk local file storage</li>
          <li> Always handle errors & loading states</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
