import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi07() {
  return (
    <MateriLayout
      title="Layout Widgets"
      intro="Master layout widgets untuk mengatur tata letak UI - Row, Column, Stack, Container, ListView, GridView, dan lainnya. Build complex, responsive layouts with ease!"
    >
      {/* Row & Column */}
      <Section id="row-column" heading="Row & Column">
        <p>
          <code>Row</code> dan <code>Column</code> adalah fundamental layout widgets untuk arrange children secara horizontal atau vertical.
        </p>

        <Subsection id="row-widget" heading="Row - Horizontal Layout">
          <CodeBlock language="dart">
{`// Basic Row
Row(
  children: [
    Icon(Icons.star),
    Icon(Icons.star),
    Icon(Icons.star),
  ],
)

// Row with spacing
Row(
  mainAxisAlignment: MainAxisAlignment.spaceAround,
  children: [
    Icon(Icons.home),
    Icon(Icons.search),
    Icon(Icons.settings),
  ],
)

// Row alignment options
Row(
  mainAxisAlignment: MainAxisAlignment.start,    // default
  mainAxisAlignment: MainAxisAlignment.center,   // centered
  mainAxisAlignment: MainAxisAlignment.end,      // right
  mainAxisAlignment: MainAxisAlignment.spaceBetween,  // space between
  mainAxisAlignment: MainAxisAlignment.spaceAround,   // space around
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,   // equal space
  
  crossAxisAlignment: CrossAxisAlignment.start,   // top
  crossAxisAlignment: CrossAxisAlignment.center,  // middle (default)
  crossAxisAlignment: CrossAxisAlignment.end,     // bottom
  crossAxisAlignment: CrossAxisAlignment.stretch, // fill height
)`}
          </CodeBlock>
        </Subsection>

        <Subsection id="column-widget" heading="Column - Vertical Layout">
          <CodeBlock language="dart">
{`// Basic Column
Column(
  children: [
    Text('Title'),
    Text('Subtitle'),
    Text('Description'),
  ],
)

// Column with alignment
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    Text('Item 1'),
    Text('Item 2'),
    Text('Item 3'),
  ],
)`}
          </CodeBlock>
        </Subsection>

        <Subsection id="expanded-flexible" heading="Expanded & Flexible">
          <p>
            <code>Expanded</code> dan <code>Flexible</code> mengatur bagaimana child mengisi available space di Row/Column.
          </p>

          <CodeBlock language="dart">
{`// Expanded - fill available space equally
Row(
  children: [
    Expanded(
      child: Container(color: Colors.red, height: 100),
    ),
    Expanded(
      child: Container(color: Colors.blue, height: 100),
    ),
  ],
)

// Expanded with flex ratio
Row(
  children: [
    Expanded(
      flex: 2,  // takes 2/3 of space
      child: Container(color: Colors.red),
    ),
    Expanded(
      flex: 1,  // takes 1/3 of space
      child: Container(color: Colors.blue),
    ),
  ],
)

// Flexible - can shrink but not exceed space
Row(
  children: [
    Flexible(
      child: Container(
        width: 1000,  // wants to be wide but will shrink
        color: Colors.red,
      ),
    ),
    Container(width: 100, color: Colors.blue),
  ],
)`}
          </CodeBlock>

          <Note type="tip">
            <strong>Expanded vs Flexible:</strong><br/>
            • <code>Expanded</code>: Must fill available space (flex: 1 default)<br/>
            • <code>Flexible</code>: Can be smaller than space, won't overflow
          </Note>
        </Subsection>
      </Section>

      {/* Stack & Positioned */}
      <Section id="stack" heading="Stack & Positioned">
        <p>
          <code>Stack</code> allows overlapping widgets (z-axis layering). Children drawn in order, last child on top.
        </p>

        <CodeBlock language="dart">
{`// Basic Stack
Stack(
  children: [
    Container(
      width: 200,
      height: 200,
      color: Colors.blue,
    ),
    Container(
      width: 100,
      height: 100,
      color: Colors.red,
    ),
  ],
)

// Stack with alignment
Stack(
  alignment: Alignment.center,  // center all children
  children: [
    Container(width: 200, height: 200, color: Colors.blue),
    Icon(Icons.star, size: 50, color: Colors.white),
  ],
)

// Positioned - absolute positioning
Stack(
  children: [
    Container(width: 300, height: 300, color: Colors.grey),
    Positioned(
      top: 20,
      left: 20,
      child: Icon(Icons.close),
    ),
    Positioned(
      bottom: 20,
      right: 20,
      child: Icon(Icons.check),
    ),
    // Center positioned
    Positioned.fill(
      child: Center(
        child: Text('Centered'),
      ),
    ),
  ],
)

// Badge example
Stack(
  children: [
    Icon(Icons.notifications, size: 48),
    Positioned(
      right: 0,
      top: 0,
      child: Container(
        padding: EdgeInsets.all(4),
        decoration: BoxDecoration(
          color: Colors.red,
          shape: BoxShape.circle,
        ),
        child: Text('3', style: TextStyle(color: Colors.white, fontSize: 10)),
      ),
    ),
  ],
)`}
        </CodeBlock>

        <Note type="info">
          <code>Positioned</code> hanya berfungsi inside <code>Stack</code>. Gunakan untuk badges, overlays, floating buttons.
        </Note>
      </Section>

      {/* ListView */}
      <Section id="listview" heading="ListView">
        <p>
          <code>ListView</code> adalah scrollable list of widgets. Ideal untuk dynamic content dan long lists.
        </p>

        <Subsection id="listview-basic" heading="ListView Variants">
          <CodeBlock language="dart">
{`// 1. ListView with children (for small lists)
ListView(
  children: [
    ListTile(title: Text('Item 1')),
    ListTile(title: Text('Item 2')),
    ListTile(title: Text('Item 3')),
  ],
)

// 2. ListView.builder (for large/dynamic lists - RECOMMENDED)
ListView.builder(
  itemCount: 1000,
  itemBuilder: (context, index) {
    return ListTile(
      leading: CircleAvatar(child: Text('\${index + 1}')),
      title: Text('Item \$index'),
      subtitle: Text('Subtitle for item \$index'),
      trailing: Icon(Icons.arrow_forward),
      onTap: () {
        print('Tapped item \$index');
      },
    );
  },
)

// 3. ListView.separated (with dividers)
ListView.separated(
  itemCount: 20,
  itemBuilder: (context, index) {
    return ListTile(title: Text('Item \$index'));
  },
  separatorBuilder: (context, index) {
    return Divider();  // Separator between items
  },
)

// 4. Horizontal ListView
ListView.builder(
  scrollDirection: Axis.horizontal,
  itemCount: 10,
  itemBuilder: (context, index) {
    return Container(
      width: 150,
      margin: EdgeInsets.all(8),
      color: Colors.blue,
      child: Center(child: Text('Item \$index')),
    );
  },
)`}
          </CodeBlock>
        </Subsection>

        <Subsection id="listview-custom" heading="Custom List Items">
          <CodeBlock language="dart">
{`class ContactList extends StatelessWidget {
  final List<Contact> contacts = [
    Contact(name: 'Alice', phone: '081234567890'),
    Contact(name: 'Bob', phone: '081234567891'),
    // ... more contacts
  ];
  
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: contacts.length,
      itemBuilder: (context, index) {
        final contact = contacts[index];
        return Card(
          margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: ListTile(
            leading: CircleAvatar(
              child: Text(contact.name[0]),
            ),
            title: Text(contact.name),
            subtitle: Text(contact.phone),
            trailing: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                IconButton(
                  icon: Icon(Icons.call),
                  onPressed: () {},
                ),
                IconButton(
                  icon: Icon(Icons.message),
                  onPressed: () {},
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}`}
          </CodeBlock>
        </Subsection>

        <Note type="success">
          <strong>ListView.builder performance:</strong> Only builds visible items + buffer. Perfect for thousands of items!
        </Note>
      </Section>

      {/* GridView */}
      <Section id="gridview" heading="GridView">
        <p>
          <code>GridView</code> displays items in 2D grid. Great untuk photo galleries, product catalogs, etc.
        </p>

        <Subsection id="gridview-variants" heading="GridView Variants">
          <CodeBlock language="dart">
{`// 1. GridView.count - fixed column count
GridView.count(
  crossAxisCount: 3,  // 3 columns
  crossAxisSpacing: 10,
  mainAxisSpacing: 10,
  padding: EdgeInsets.all(10),
  children: List.generate(50, (index) {
    return Container(
      color: Colors.blue,
      child: Center(child: Text('\$index')),
    );
  }),
)

// 2. GridView.builder - dynamic grid (RECOMMENDED)
GridView.builder(
  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2,
    crossAxisSpacing: 10,
    mainAxisSpacing: 10,
    childAspectRatio: 1,  // width/height ratio
  ),
  itemCount: 100,
  itemBuilder: (context, index) {
    return Card(
      child: Center(child: Text('Item \$index')),
    );
  },
)

// 3. GridView with max cross-axis extent
GridView.builder(
  gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
    maxCrossAxisExtent: 150,  // max width of each item
    crossAxisSpacing: 10,
    mainAxisSpacing: 10,
  ),
  itemBuilder: (context, index) {
    return Container(color: Colors.green);
  },
)

// 4. Photo gallery example
GridView.builder(
  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 3,
    mainAxisSpacing: 4,
    crossAxisSpacing: 4,
  ),
  itemCount: photos.length,
  itemBuilder: (context, index) {
    return Image.network(
      photos[index],
      fit: BoxFit.cover,
    );
  },
)`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Wrap */}
      <Section id="wrap" heading="Wrap">
        <p>
          <code>Wrap</code> like Row/Column but automatically wraps children to next line when no space.
        </p>

        <CodeBlock language="dart">
{`// Wrap for tags/chips
Wrap(
  spacing: 8,  // horizontal spacing
  runSpacing: 8,  // vertical spacing
  children: [
    Chip(label: Text('Flutter')),
    Chip(label: Text('Dart')),
    Chip(label: Text('Mobile')),
    Chip(label: Text('Android')),
    Chip(label: Text('iOS')),
    Chip(label: Text('Web')),
    Chip(label: Text('Desktop')),
  ],
)

// Wrap with alignment
Wrap(
  alignment: WrapAlignment.center,
  children: [...],
)`}
        </CodeBlock>

        <Note type="tip">
          Use <code>Wrap</code> untuk tags, filters, atau buttons yang jumlahnya dynamic dan harus responsive.
        </Note>
      </Section>

      {/* SingleChildScrollView */}
      <Section id="scrollview" heading="SingleChildScrollView">
        <p>
          <code>SingleChildScrollView</code> makes any widget scrollable. Use untuk forms atau content that might overflow.
        </p>

        <CodeBlock language="dart">
{`// Scrollable form
SingleChildScrollView(
  padding: EdgeInsets.all(16),
  child: Column(
    children: [
      TextField(decoration: InputDecoration(labelText: 'Name')),
      SizedBox(height: 16),
      TextField(decoration: InputDecoration(labelText: 'Email')),
      SizedBox(height: 16),
      TextField(
        decoration: InputDecoration(labelText: 'Message'),
        maxLines: 5,
      ),
      SizedBox(height: 16),
      ElevatedButton(
        onPressed: () {},
        child: Text('Submit'),
      ),
    ],
  ),
)

// Horizontal scroll
SingleChildScrollView(
  scrollDirection: Axis.horizontal,
  child: Row(
    children: List.generate(20, (index) {
      return Container(
        width: 100,
        height: 100,
        margin: EdgeInsets.all(8),
        color: Colors.blue,
      );
    }),
  ),
)`}
        </CodeBlock>

        <Note type="warning">
          Jangan wrap <code>ListView</code> inside <code>SingleChildScrollView</code>! Use ListView saja atau set <code>shrinkWrap: true</code>.
        </Note>
      </Section>

      {/* Padding & Margin */}
      <Section id="spacing" heading="Padding, Margin & SizedBox">
        <CodeBlock language="dart">
{`// Padding - internal spacing
Padding(
  padding: EdgeInsets.all(16),  // all sides
  child: Text('Padded text'),
)

Padding(
  padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
  child: Text('Symmetric padding'),
)

Padding(
  padding: EdgeInsets.only(top: 10, left: 20),
  child: Text('Custom padding'),
)

// Margin - external spacing (use Container)
Container(
  margin: EdgeInsets.all(16),
  child: Text('With margin'),
)

// SizedBox - fixed spacing
Column(
  children: [
    Text('Item 1'),
    SizedBox(height: 20),  // vertical space
    Text('Item 2'),
  ],
)

Row(
  children: [
    Icon(Icons.star),
    SizedBox(width: 10),  // horizontal space
    Text('Rating'),
  ],
)`}
        </CodeBlock>
      </Section>

      {/* Align & Center */}
      <Section id="alignment" heading="Align & Center">
        <CodeBlock language="dart">
{`// Center - centers child
Center(
  child: Text('Centered'),
)

// Align - custom alignment
Align(
  alignment: Alignment.topRight,
  child: Icon(Icons.close),
)

// Alignment options
Alignment.topLeft
Alignment.topCenter
Alignment.topRight
Alignment.centerLeft
Alignment.center
Alignment.centerRight
Alignment.bottomLeft
Alignment.bottomCenter
Alignment.bottomRight

// Custom alignment (x, y from -1 to 1)
Align(
  alignment: Alignment(0.5, -0.5),  // custom position
  child: Widget(),
)`}
        </CodeBlock>
      </Section>

      {/* Practical Example */}
      <Section id="example" heading="Practical Example: Product Grid">
        <CodeBlock language="dart">
{`class ProductGrid extends StatelessWidget {
  final List<Product> products;
  
  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      padding: EdgeInsets.all(16),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        childAspectRatio: 0.75,
        crossAxisSpacing: 16,
        mainAxisSpacing: 16,
      ),
      itemCount: products.length,
      itemBuilder: (context, index) {
        final product = products[index];
        return Card(
          clipBehavior: Clip.antiAlias,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Image.network(
                  product.imageUrl,
                  fit: BoxFit.cover,
                  width: double.infinity,
                ),
              ),
              Padding(
                padding: EdgeInsets.all(8),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      product.name,
                      style: TextStyle(fontWeight: FontWeight.bold),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    SizedBox(height: 4),
                    Text(
                      '\Rp{product.price}',
                      style: TextStyle(
                        color: Colors.blue,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}`}
        </CodeBlock>
      </Section>

      {/* Best Practices */}
      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li> Use <code>ListView.builder</code> untuk lists dengan banyak items</li>
          <li> Use <code>const</code> constructors untuk static widgets</li>
          <li> Avoid nesting <code>ListView</code> inside <code>Column</code> without <code>shrinkWrap</code></li>
          <li> Use <code>Expanded</code> untuk fill available space di Row/Column</li>
          <li> Use <code>Stack</code> untuk overlays, badges, floating elements</li>
          <li> Extract complex layouts ke separate widgets</li>
          <li> Test layouts pada different screen sizes</li>
        </ul>
      </Section>

      {/* Rangkuman */}
      <Section id="summary" heading="Rangkuman">
        <ul>
          <li> Row & Column untuk linear layouts (horizontal/vertical)</li>
          <li> Expanded & Flexible untuk flexible sizing</li>
          <li> Stack & Positioned untuk overlapping widgets</li>
          <li> ListView untuk scrollable lists (use builder for performance)</li>
          <li> GridView untuk 2D grids</li>
          <li> Wrap untuk auto-wrapping layouts</li>
          <li> SingleChildScrollView untuk scrollable content</li>
          <li> Padding, SizedBox untuk spacing</li>
          <li> Align & Center untuk positioning</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
