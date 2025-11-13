import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi08() {
  return (
    <MateriLayout
      title="Interactive Widgets"
      intro="Learn to build interactive UIs dengan TextField, Buttons, Forms, GestureDetector, dan user input handling. Create engaging, responsive applications!"
    >
      <Section id="textfield" heading="TextField & Input">
        <p>
          <code>TextField</code> adalah widget untuk text input dari user. Support berbagai configurations untuk different use cases.
        </p>

        <Subsection id="basic-textfield" heading="Basic TextField">
          <CodeBlock language="dart">
{`// Basic TextField
TextField()

// TextField dengan decoration
TextField(
  decoration: InputDecoration(
    labelText: 'Username',
    hintText: 'Enter your username',
    prefixIcon: Icon(Icons.person),
    border: OutlineInputBorder(),
  ),
)

// TextField dengan controller
class MyForm extends StatefulWidget {
  @override
  State<MyForm> createState() => _MyFormState();
}

class _MyFormState extends State<MyForm> {
  final TextEditingController _controller = TextEditingController();
  
  @override
  void dispose() {
    _controller.dispose();  // Always dispose controllers!
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TextField(
          controller: _controller,
          decoration: InputDecoration(labelText: 'Name'),
        ),
        ElevatedButton(
          onPressed: () {
            print('Input: \${_controller.text}');
          },
          child: Text('Submit'),
        ),
      ],
    );
  }
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="textfield-types" heading="TextField Variations">
          <CodeBlock language="dart">
{`// Password field
TextField(
  obscureText: true,
  decoration: InputDecoration(
    labelText: 'Password',
    suffixIcon: Icon(Icons.visibility),
  ),
)

// Email field
TextField(
  keyboardType: TextInputType.emailAddress,
  decoration: InputDecoration(labelText: 'Email'),
)

// Number field
TextField(
  keyboardType: TextInputType.number,
  decoration: InputDecoration(labelText: 'Age'),
)

// Multiline text
TextField(
  maxLines: 5,
  decoration: InputDecoration(
    labelText: 'Message',
    alignedLabelTop: true,
  ),
)

// TextField with onChange
TextField(
  onChanged: (value) {
    print('Current value: \$value');
  },
  decoration: InputDecoration(labelText: 'Search'),
)`}
          </CodeBlock>
        </Subsection>

        <Subsection id="textformfield" heading="TextFormField & Validation">
          <p>
            <code>TextFormField</code> extends TextField dengan built-in validation support untuk Forms.
          </p>

          <CodeBlock language="dart">
{`class LoginForm extends StatefulWidget {
  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  
  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }
  
  void _submit() {
    if (_formKey.currentState!.validate()) {
      // Form is valid, proceed
      print('Email: \${_emailController.text}');
      print('Password: \${_passwordController.text}');
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: _emailController,
            keyboardType: TextInputType.emailAddress,
            decoration: InputDecoration(
              labelText: 'Email',
              prefixIcon: Icon(Icons.email),
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter email';
              }
              if (!value.contains('@')) {
                return 'Please enter valid email';
              }
              return null;  // Valid
            },
          ),
          SizedBox(height: 16),
          TextFormField(
            controller: _passwordController,
            obscureText: true,
            decoration: InputDecoration(
              labelText: 'Password',
              prefixIcon: Icon(Icons.lock),
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter password';
              }
              if (value.length < 6) {
                return 'Password must be at least 6 characters';
              }
              return null;
            },
          ),
          SizedBox(height: 24),
          ElevatedButton(
            onPressed: _submit,
            child: Text('Login'),
          ),
        ],
      ),
    );
  }
}`}
          </CodeBlock>

          <Note type="tip">
            <strong>Form validation best practices:</strong><br/>
            • Use GlobalKey untuk access form state<br/>
            • Return null dari validator jika valid<br/>
            • Return error string jika invalid<br/>
            • Always dispose TextEditingControllers
          </Note>
        </Subsection>
      </Section>

      <Section id="buttons" heading="Interactive Buttons">
        <Subsection id="button-states" heading="Button States & Callbacks">
          <CodeBlock language="dart">
{`class InteractiveButtons extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Basic button with onPressed
        ElevatedButton(
          onPressed: () {
            print('Button pressed');
          },
          child: Text('Click Me'),
        ),
        
        // Disabled button
        ElevatedButton(
          onPressed: null,  // null = disabled
          child: Text('Disabled'),
        ),
        
        // Button with onLongPress
        ElevatedButton(
          onPressed: () {},
          onLongPress: () {
            print('Long press detected');
          },
          child: Text('Long Press Me'),
        ),
        
        // IconButton with tooltip
        IconButton(
          icon: Icon(Icons.favorite_border),
          onPressed: () {},
          tooltip: 'Add to favorites',
        ),
      ],
    );
  }
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="stateful-button" heading="Stateful Button Example">
          <CodeBlock language="dart">
{`class FavoriteButton extends StatefulWidget {
  @override
  State<FavoriteButton> createState() => _FavoriteButtonState();
}

class _FavoriteButtonState extends State<FavoriteButton> {
  bool _isFavorite = false;
  
  void _toggleFavorite() {
    setState(() {
      _isFavorite = !_isFavorite;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: Icon(
        _isFavorite ? Icons.favorite : Icons.favorite_border,
        color: _isFavorite ? Colors.red : null,
      ),
      onPressed: _toggleFavorite,
    );
  }
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="checkbox-radio" heading="Checkbox, Radio & Switch">
        <CodeBlock language="dart">
{`class SelectionWidgets extends StatefulWidget {
  @override
  State<SelectionWidgets> createState() => _SelectionWidgetsState();
}

class _SelectionWidgetsState extends State<SelectionWidgets> {
  bool _isChecked = false;
  bool _isEnabled = true;
  String _selectedOption = 'option1';
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Checkbox
        CheckboxListTile(
          title: Text('Accept Terms & Conditions'),
          value: _isChecked,
          onChanged: (bool? value) {
            setState(() {
              _isChecked = value ?? false;
            });
          },
        ),
        
        // Switch
        SwitchListTile(
          title: Text('Enable Notifications'),
          value: _isEnabled,
          onChanged: (bool value) {
            setState(() {
              _isEnabled = value;
            });
          },
        ),
        
        // Radio buttons
        RadioListTile<String>(
          title: Text('Option 1'),
          value: 'option1',
          groupValue: _selectedOption,
          onChanged: (String? value) {
            setState(() {
              _selectedOption = value!;
            });
          },
        ),
        RadioListTile<String>(
          title: Text('Option 2'),
          value: 'option2',
          groupValue: _selectedOption,
          onChanged: (String? value) {
            setState(() {
              _selectedOption = value!;
            });
          },
        ),
      ],
    );
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="gestures" heading="GestureDetector">
        <p>
          <code>GestureDetector</code> detects various gestures: tap, double tap, long press, drag, pinch, etc.
        </p>

        <Subsection id="basic-gestures" heading="Common Gestures">
          <CodeBlock language="dart">
{`GestureDetector(
  onTap: () {
    print('Tapped!');
  },
  onDoubleTap: () {
    print('Double tapped!');
  },
  onLongPress: () {
    print('Long pressed!');
  },
  child: Container(
    width: 200,
    height: 200,
    color: Colors.blue,
    child: Center(child: Text('Tap Me')),
  ),
)

// Drag gestures
GestureDetector(
  onPanUpdate: (details) {
    print('Dragging: \${details.delta}');
  },
  onPanEnd: (details) {
    print('Drag ended');
  },
  child: Container(
    width: 100,
    height: 100,
    color: Colors.red,
  ),
)`}
          </CodeBlock>
        </Subsection>

        <Subsection id="draggable-example" heading="Draggable Widget Example">
          <CodeBlock language="dart">
{`class DraggableBox extends StatefulWidget {
  @override
  State<DraggableBox> createState() => _DraggableBoxState();
}

class _DraggableBoxState extends State<DraggableBox> {
  Offset _position = Offset(100, 100);
  
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Positioned(
          left: _position.dx,
          top: _position.dy,
          child: GestureDetector(
            onPanUpdate: (details) {
              setState(() {
                _position = Offset(
                  _position.dx + details.delta.dx,
                  _position.dy + details.delta.dy,
                );
              });
            },
            child: Container(
              width: 100,
              height: 100,
              decoration: BoxDecoration(
                color: Colors.blue,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Center(
                child: Text(
                  'Drag Me',
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="inkwell" heading="InkWell & Material Ripple">
        <p>
          <code>InkWell</code> provides Material ripple effect untuk tap feedback.
        </p>

        <CodeBlock language="dart">
{`// InkWell with ripple effect
InkWell(
  onTap: () {
    print('Tapped with ripple!');
  },
  child: Container(
    padding: EdgeInsets.all(16),
    child: Text('Tap for ripple effect'),
  ),
)

// Card with InkWell
Card(
  child: InkWell(
    onTap: () {
      print('Card tapped');
    },
    child: Padding(
      padding: EdgeInsets.all(16),
      child: Column(
        children: [
          Icon(Icons.favorite, size: 48),
          SizedBox(height: 8),
          Text('Favorite'),
        ],
      ),
    ),
  ),
)

// Custom ripple color
InkWell(
  onTap: () {},
  splashColor: Colors.blue.withOpacity(0.3),
  highlightColor: Colors.blue.withOpacity(0.1),
  child: Container(
    padding: EdgeInsets.all(16),
    child: Text('Custom ripple'),
  ),
)`}
        </CodeBlock>

        <Note type="tip">
          Use <code>InkWell</code> untuk Material Design ripple effects. Use <code>GestureDetector</code> jika tidak butuh visual feedback.
        </Note>
      </Section>

      <Section id="slider" heading="Slider & RangeSlider">
        <CodeBlock language="dart">
{`class SliderDemo extends StatefulWidget {
  @override
  State<SliderDemo> createState() => _SliderDemoState();
}

class _SliderDemoState extends State<SliderDemo> {
  double _value = 50;
  RangeValues _rangeValues = RangeValues(20, 80);
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Slider
        Text('Value: \${_value.round()}'),
        Slider(
          value: _value,
          min: 0,
          max: 100,
          divisions: 100,
          label: _value.round().toString(),
          onChanged: (double value) {
            setState(() {
              _value = value;
            });
          },
        ),
        
        SizedBox(height: 20),
        
        // RangeSlider
        Text('Range: \${_rangeValues.start.round()} - \${_rangeValues.end.round()}'),
        RangeSlider(
          values: _rangeValues,
          min: 0,
          max: 100,
          divisions: 100,
          labels: RangeLabels(
            _rangeValues.start.round().toString(),
            _rangeValues.end.round().toString(),
          ),
          onChanged: (RangeValues values) {
            setState(() {
              _rangeValues = values;
            });
          },
        ),
      ],
    );
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="practical" heading="Practical Example: Complete Form">
        <CodeBlock language="dart">
{`class ContactForm extends StatefulWidget {
  @override
  State<ContactForm> createState() => _ContactFormState();
}

class _ContactFormState extends State<ContactForm> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _messageController = TextEditingController();
  bool _subscribe = false;
  
  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _messageController.dispose();
    super.dispose();
  }
  
  void _submitForm() {
    if (_formKey.currentState!.validate()) {
      // Show success message
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Form submitted successfully!'),
          backgroundColor: Colors.green,
        ),
      );
      
      // Clear form
      _nameController.clear();
      _emailController.clear();
      _messageController.clear();
      setState(() {
        _subscribe = false;
      });
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Contact Us')),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              TextFormField(
                controller: _nameController,
                decoration: InputDecoration(
                  labelText: 'Name',
                  prefixIcon: Icon(Icons.person),
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your name';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              
              TextFormField(
                controller: _emailController,
                keyboardType: TextInputType.emailAddress,
                decoration: InputDecoration(
                  labelText: 'Email',
                  prefixIcon: Icon(Icons.email),
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your email';
                  }
                  if (!value.contains('@')) {
                    return 'Please enter a valid email';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              
              TextFormField(
                controller: _messageController,
                maxLines: 5,
                decoration: InputDecoration(
                  labelText: 'Message',
                  prefixIcon: Icon(Icons.message),
                  border: OutlineInputBorder(),
                  alignLabelWithHint: true,
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a message';
                  }
                  if (value.length < 10) {
                    return 'Message must be at least 10 characters';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              
              CheckboxListTile(
                title: Text('Subscribe to newsletter'),
                value: _subscribe,
                onChanged: (bool? value) {
                  setState(() {
                    _subscribe = value ?? false;
                  });
                },
                controlAffinity: ListTileControlAffinity.leading,
              ),
              SizedBox(height: 24),
              
              ElevatedButton(
                onPressed: _submitForm,
                style: ElevatedButton.styleFrom(
                  padding: EdgeInsets.symmetric(vertical: 16),
                ),
                child: Text('Submit', style: TextStyle(fontSize: 18)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li> Always dispose TextEditingControllers di dispose()</li>
          <li> Use Form & TextFormField untuk complex forms dengan validation</li>
          <li> Provide visual feedback untuk user interactions (ripples, colors)</li>
          <li> Use appropriate keyboard types (email, number, phone)</li>
          <li> Validate input sebelum submit</li>
          <li> Show clear error messages</li>
          <li> Use InkWell untuk Material Design ripple effects</li>
          <li> Disable buttons during async operations</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li> TextField untuk text input dengan controller</li>
          <li> TextFormField untuk forms dengan built-in validation</li>
          <li> Various button types: ElevatedButton, OutlinedButton, TextButton, IconButton</li>
          <li> Selection widgets: Checkbox, Radio, Switch</li>
          <li> GestureDetector untuk custom gestures</li>
          <li> InkWell untuk Material ripple effects</li>
          <li> Slider untuk range selection</li>
          <li> Form validation dengan GlobalKey</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
