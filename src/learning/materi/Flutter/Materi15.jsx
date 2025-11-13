import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi15() {
  return (
    <MateriLayout
      title="Animation & Transitions"
      intro="Master animations di Flutter - implicit animations, explicit animations dengan AnimationController, Hero transitions, curves, dan animation best practices."
    >
      <Section id="implicit-animations" heading="Implicit Animations">
        <p>
          <strong>Implicit animations</strong> adalah easiest way untuk add animations. Flutter automatically animates property changes.
        </p>

        <Subsection id="animated-container" heading="AnimatedContainer">
          <CodeBlock language="dart">
{`class AnimatedContainerExample extends StatefulWidget {
  @override
  State<AnimatedContainerExample> createState() => _AnimatedContainerExampleState();
}

class _AnimatedContainerExampleState extends State<AnimatedContainerExample> {
  bool _expanded = false;
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: GestureDetector(
          onTap: () {
            setState(() {
              _expanded = !_expanded;
            });
          },
          child: AnimatedContainer(
            duration: Duration(milliseconds: 300),
            curve: Curves.easeInOut,
            width: _expanded ? 300 : 100,
            height: _expanded ? 300 : 100,
            decoration: BoxDecoration(
              color: _expanded ? Colors.blue : Colors.red,
              borderRadius: BorderRadius.circular(_expanded ? 50 : 10),
            ),
            child: Center(
              child: Text(
                'Tap Me',
                style: TextStyle(color: Colors.white, fontSize: 20),
              ),
            ),
          ),
        ),
      ),
    );
  }
}`}
          </CodeBlock>

          <Note type="tip">
            <code>AnimatedContainer</code> automatically animates: width, height, color, padding, margin, borderRadius, etc.
          </Note>
        </Subsection>

        <Subsection id="other-implicit" heading="Other Implicit Widgets">
          <CodeBlock language="dart">
{`// AnimatedOpacity - Fade in/out
AnimatedOpacity(
  opacity: _visible ? 1.0 : 0.0,
  duration: Duration(milliseconds: 500),
  child: Text('Hello'),
)

// AnimatedAlign - Position changes
AnimatedAlign(
  alignment: _aligned ? Alignment.topLeft : Alignment.bottomRight,
  duration: Duration(milliseconds: 300),
  child: Container(width: 50, height: 50, color: Colors.blue),
)

// AnimatedPadding
AnimatedPadding(
  padding: _padded ? EdgeInsets.all(50) : EdgeInsets.all(10),
  duration: Duration(milliseconds: 300),
  child: Container(color: Colors.green),
)

// AnimatedPositioned - Inside Stack
Stack(
  children: [
    AnimatedPositioned(
      duration: Duration(milliseconds: 400),
      left: _moved ? 200 : 0,
      top: _moved ? 300 : 0,
      child: Container(width: 100, height: 100, color: Colors.purple),
    ),
  ],
)

// AnimatedDefaultTextStyle
AnimatedDefaultTextStyle(
  duration: Duration(milliseconds: 300),
  style: TextStyle(
    fontSize: _large ? 48 : 16,
    color: _large ? Colors.red : Colors.blue,
  ),
  child: Text('Animated Text'),
)

// AnimatedCrossFade - Switch between two widgets
AnimatedCrossFade(
  duration: Duration(milliseconds: 300),
  firstChild: Icon(Icons.favorite_border, size: 64),
  secondChild: Icon(Icons.favorite, size: 64, color: Colors.red),
  crossFadeState: _liked ? CrossFadeState.showSecond : CrossFadeState.showFirst,
)`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="explicit-animations" heading="Explicit Animations">
        <p>
          <strong>Explicit animations</strong> give you full control dengan AnimationController. More powerful tapi lebih complex.
        </p>

        <Subsection id="animation-controller" heading="AnimationController Basics">
          <CodeBlock language="dart">
{`class ExplicitAnimationExample extends StatefulWidget {
  @override
  State<ExplicitAnimationExample> createState() => _ExplicitAnimationExampleState();
}

class _ExplicitAnimationExampleState extends State<ExplicitAnimationExample>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;
  
  @override
  void initState() {
    super.initState();
    
    // Create controller
    _controller = AnimationController(
      duration: Duration(seconds: 2),
      vsync: this,  // Required for smooth animations
    );
    
    // Create animation (0.0 to 1.0)
    _animation = Tween<double>(begin: 0.0, end: 1.0).animate(_controller);
    
    // Listen to animation changes (optional)
    _animation.addListener(() {
      setState(() {});
    });
    
    // Start animation
    _controller.forward();
  }
  
  @override
  void dispose() {
    _controller.dispose();  // IMPORTANT: Always dispose!
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Opacity(
              opacity: _animation.value,
              child: Container(
                width: 200,
                height: 200,
                color: Colors.blue,
              ),
            ),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(
                  onPressed: () => _controller.forward(),
                  child: Text('Forward'),
                ),
                ElevatedButton(
                  onPressed: () => _controller.reverse(),
                  child: Text('Reverse'),
                ),
                ElevatedButton(
                  onPressed: () => _controller.repeat(),
                  child: Text('Repeat'),
                ),
                ElevatedButton(
                  onPressed: () => _controller.stop(),
                  child: Text('Stop'),
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
        </Subsection>

        <Subsection id="tween-animations" heading="Tween Animations">
          <CodeBlock language="dart">
{`// Double Tween (size, opacity, etc.)
Animation<double> _sizeAnimation = Tween<double>(
  begin: 50.0,
  end: 200.0,
).animate(_controller);

// Color Tween
Animation<Color?> _colorAnimation = ColorTween(
  begin: Colors.red,
  end: Colors.blue,
).animate(_controller);

// Offset Tween (position)
Animation<Offset> _slideAnimation = Tween<Offset>(
  begin: Offset(-1, 0),
  end: Offset.zero,
).animate(_controller);

// Use in widget
Container(
  width: _sizeAnimation.value,
  height: _sizeAnimation.value,
  color: _colorAnimation.value,
)`}
          </CodeBlock>
        </Subsection>

        <Subsection id="curves" heading="Animation Curves">
          <CodeBlock language="dart">
{`// Apply curve to animation
Animation<double> _curvedAnimation = CurvedAnimation(
  parent: _controller,
  curve: Curves.easeInOut,
);

Animation<double> _animation = Tween<double>(
  begin: 0.0,
  end: 300.0,
).animate(_curvedAnimation);

// Common curves:
Curves.linear          // Constant speed
Curves.easeIn          // Slow start, fast end
Curves.easeOut         // Fast start, slow end
Curves.easeInOut       // Slow start and end
Curves.bounceIn        // Bounce at start
Curves.bounceOut       // Bounce at end
Curves.elasticIn       // Elastic effect at start
Curves.elasticOut      // Elastic effect at end
Curves.fastOutSlowIn   // Material design curve

// Custom curve
Animation<double> _customAnimation = Tween<double>(
  begin: 0.0,
  end: 1.0,
).animate(
  CurvedAnimation(
    parent: _controller,
    curve: Interval(0.0, 0.5, curve: Curves.easeIn),  // First half
  ),
);`}
          </CodeBlock>
        </Subsection>

        <Subsection id="animated-builder" heading="AnimatedBuilder">
          <CodeBlock language="dart">
{`// AnimatedBuilder - Efficient way to rebuild only animated part
class RotatingBox extends StatefulWidget {
  @override
  State<RotatingBox> createState() => _RotatingBoxState();
}

class _RotatingBoxState extends State<RotatingBox>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(seconds: 2),
      vsync: this,
    )..repeat();  // Repeat forever
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Transform.rotate(
          angle: _controller.value * 2 * 3.14159,  // Full rotation
          child: child,
        );
      },
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
      ),
    );
  }
}`}
          </CodeBlock>

          <Note type="success">
            <code>AnimatedBuilder</code> only rebuilds the animated widget, not the entire tree. More efficient!
          </Note>
        </Subsection>
      </Section>

      <Section id="hero-animation" heading="Hero Animations">
        <p>
          <strong>Hero</strong> animation automatically animates widget between two screens. Perfect for image transitions!
        </p>

        <CodeBlock language="dart">
{`// Screen 1: List
class ProductListScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Products')),
      body: ListView.builder(
        itemCount: 10,
        itemBuilder: (context, index) {
          return ListTile(
            leading: Hero(
              tag: 'product-\$index',  // Unique tag
              child: CircleAvatar(
                backgroundImage: NetworkImage('https://picsum.photos/200?random=\$index'),
              ),
            ),
            title: Text('Product \$index'),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ProductDetailScreen(index: index),
                ),
              );
            },
          );
        },
      ),
    );
  }
}

// Screen 2: Detail
class ProductDetailScreen extends StatelessWidget {
  final int index;
  
  const ProductDetailScreen({required this.index});
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Product \$index')),
      body: Column(
        children: [
          Hero(
            tag: 'product-\$index',  // Same tag as previous screen
            child: Image.network(
              'https://picsum.photos/400?random=\$index',
              width: double.infinity,
              height: 300,
              fit: BoxFit.cover,
            ),
          ),
          Padding(
            padding: EdgeInsets.all(16),
            child: Text(
              'Product \$index Details',
              style: TextStyle(fontSize: 24),
            ),
          ),
        ],
      ),
    );
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="staggered-animations" heading="Staggered Animations">
        <p>
          Multiple animations dengan different timings untuk create smooth sequence effects.
        </p>

        <CodeBlock language="dart">
{`class StaggeredAnimationExample extends StatefulWidget {
  @override
  State<StaggeredAnimationExample> createState() => _StaggeredAnimationExampleState();
}

class _StaggeredAnimationExampleState extends State<StaggeredAnimationExample>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _opacity;
  late Animation<double> _size;
  late Animation<Offset> _slide;
  
  @override
  void initState() {
    super.initState();
    
    _controller = AnimationController(
      duration: Duration(milliseconds: 1500),
      vsync: this,
    );
    
    // Stagger animations with Intervals
    _opacity = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Interval(0.0, 0.3, curve: Curves.easeIn),  // 0-30%
      ),
    );
    
    _size = Tween<double>(begin: 0.0, end: 200.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Interval(0.3, 0.7, curve: Curves.easeOut),  // 30-70%
      ),
    );
    
    _slide = Tween<Offset>(begin: Offset(0, 1), end: Offset.zero).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Interval(0.7, 1.0, curve: Curves.bounceOut),  // 70-100%
      ),
    );
    
    _controller.forward();
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Scaffold(
          body: Center(
            child: Opacity(
              opacity: _opacity.value,
              child: Container(
                width: _size.value,
                height: _size.value,
                color: Colors.blue,
                child: SlideTransition(
                  position: _slide,
                  child: Center(
                    child: Text(
                      'Staggered!',
                      style: TextStyle(color: Colors.white, fontSize: 24),
                    ),
                  ),
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="practical-examples" heading="Practical Examples">
        <Subsection id="loading-animation" heading="Loading Animation">
          <CodeBlock language="dart">
{`class PulsingLoader extends StatefulWidget {
  @override
  State<PulsingLoader> createState() => _PulsingLoaderState();
}

class _PulsingLoaderState extends State<PulsingLoader>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(milliseconds: 1000),
      vsync: this,
    )..repeat(reverse: true);
    
    _animation = Tween<double>(begin: 0.8, end: 1.2).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return ScaleTransition(
      scale: _animation,
      child: Container(
        width: 50,
        height: 50,
        decoration: BoxDecoration(
          color: Colors.blue,
          shape: BoxShape.circle,
        ),
      ),
    );
  }
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="slide-in-card" heading="Slide-in Card">
          <CodeBlock language="dart">
{`class SlideInCard extends StatefulWidget {
  final Widget child;
  final int delay;
  
  const SlideInCard({required this.child, this.delay = 0});
  
  @override
  State<SlideInCard> createState() => _SlideInCardState();
}

class _SlideInCardState extends State<SlideInCard>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<Offset> _slideAnimation;
  late Animation<double> _fadeAnimation;
  
  @override
  void initState() {
    super.initState();
    
    _controller = AnimationController(
      duration: Duration(milliseconds: 600),
      vsync: this,
    );
    
    _slideAnimation = Tween<Offset>(
      begin: Offset(0, 0.5),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeOut,
    ));
    
    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(_controller);
    
    // Delay before starting
    Future.delayed(Duration(milliseconds: widget.delay), () {
      if (mounted) _controller.forward();
    });
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return SlideTransition(
      position: _slideAnimation,
      child: FadeTransition(
        opacity: _fadeAnimation,
        child: widget.child,
      ),
    );
  }
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li>✅ Use implicit animations untuk simple cases (AnimatedContainer, etc.)</li>
          <li>✅ Use explicit animations untuk complex sequences</li>
          <li>✅ Always dispose AnimationControllers!</li>
          <li>✅ Use AnimatedBuilder untuk performance</li>
          <li>✅ Keep animations short (200-400ms typical)</li>
          <li>✅ Use Curves untuk natural motion</li>
          <li>✅ Test animations on low-end devices</li>
          <li>✅ Don't over-animate - subtlety is key</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>✅ Implicit animations: Easy, automatic (AnimatedContainer, AnimatedOpacity)</li>
          <li>✅ Explicit animations: Full control dengan AnimationController</li>
          <li>✅ Tween: Define start and end values</li>
          <li>✅ Curves: Add natural motion feel</li>
          <li>✅ Hero: Automatic transitions between screens</li>
          <li>✅ AnimatedBuilder: Efficient rebuilds</li>
          <li>✅ Staggered animations: Multiple animations dengan intervals</li>
          <li>✅ Always dispose controllers!</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
