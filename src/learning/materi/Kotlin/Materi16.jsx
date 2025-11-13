import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi16() {
  return (
    <MateriLayout
      title="Kotlin untuk Android"
      intro="Kotlin adalah bahasa resmi untuk Android development sejak 2017. Pelajari cara menggunakan Kotlin untuk build modern Android apps dengan Jetpack libraries dan Jetpack Compose."
    >
      <Section id="setup" heading="Setup Android Project">
        <CodeBlock language="kotlin">
{`// build.gradle.kts (Module level)
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.example.myapp"
    compileSdk = 34
    
    defaultConfig {
        applicationId = "com.example.myapp"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"
    }
    
    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.appcompat:appcompat:1.6.1")
}`}
        </CodeBlock>
      </Section>

      <Section id="activity" heading="Activity dengan Kotlin">
        <CodeBlock language="kotlin">
{`class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // View binding
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        // Set click listener
        binding.button.setOnClickListener {
            binding.textView.text = "Button clicked!"
        }
        
        // Get intent extras
        val username = intent.getStringExtra("username") ?: "Guest"
        binding.textView.text = "Welcome, $username"
    }
}`}
        </CodeBlock>
      </Section>

      <Section id="viewmodel" heading="ViewModel & LiveData">
        <CodeBlock language="kotlin">
{`// Add dependency: androidx.lifecycle:lifecycle-viewmodel-ktx

class MainViewModel : ViewModel() {
    private val _counter = MutableLiveData(0)
    val counter: LiveData<Int> = _counter
    
    fun increment() {
        _counter.value = (_counter.value ?: 0) + 1
    }
}

class MainActivity : AppCompatActivity() {
    private val viewModel: MainViewModel by viewModels()
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Observe LiveData
        viewModel.counter.observe(this) { count ->
            binding.textView.text = "Count: $count"
        }
        
        binding.button.setOnClickListener {
            viewModel.increment()
        }
    }
}`}
        </CodeBlock>
      </Section>

      <Section id="coroutines" heading="Coroutines di Android">
        <CodeBlock language="kotlin">
{`class UserRepository {
    suspend fun fetchUser(id: String): User {
        return withContext(Dispatchers.IO) {
            // Network call
            api.getUser(id)
        }
    }
}

class MainViewModel : ViewModel() {
    private val repository = UserRepository()
    
    fun loadUser(id: String) {
        viewModelScope.launch {
            try {
                val user = repository.fetchUser(id)
                // Update UI
                _user.value = user
            } catch (e: Exception) {
                _error.value = e.message
            }
        }
    }
}`}
        </CodeBlock>
      </Section>

      <Section id="compose" heading="Jetpack Compose">
        <CodeBlock language="kotlin">
{`// Modern declarative UI
@Composable
fun Greeting(name: String) {
    Text(text = "Hello, $name!")
}

@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Count: $count",
            style = MaterialTheme.typography.headlineMedium
        )
        
        Button(onClick = { count++ }) {
            Text("Increment")
        }
    }
}

// Usage in Activity
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyAppTheme {
                Counter()
            }
        }
    }
}`}
        </CodeBlock>
      </Section>

      <Section id="room" heading="Room Database">
        <CodeBlock language="kotlin">
{`// Entity
@Entity(tableName = "users")
data class User(
    @PrimaryKey val id: String,
    @ColumnInfo(name = "name") val name: String,
    val age: Int
)

// DAO
@Dao
interface UserDao {
    @Query("SELECT * FROM users")
    suspend fun getAll(): List<User>
    
    @Query("SELECT * FROM users WHERE id = :id")
    suspend fun getById(id: String): User?
    
    @Insert
    suspend fun insert(user: User)
    
    @Delete
    suspend fun delete(user: User)
}

// Database
@Database(entities = [User::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao
}`}
        </CodeBlock>
      </Section>

      <Section id="retrofit" heading="Retrofit untuk Networking">
        <CodeBlock language="kotlin">
{`// API interface
interface ApiService {
    @GET("users/{id}")
    suspend fun getUser(@Path("id") id: String): User
    
    @POST("users")
    suspend fun createUser(@Body user: User): User
}

// Create Retrofit instance
val retrofit = Retrofit.Builder()
    .baseUrl("https://api.example.com/")
    .addConverterFactory(GsonConverterFactory.create())
    .build()

val api = retrofit.create(ApiService::class.java)

// Usage in ViewModel
class UserViewModel : ViewModel() {
    fun loadUser(id: String) {
        viewModelScope.launch {
            try {
                val user = api.getUser(id)
                _user.value = user
            } catch (e: Exception) {
                _error.value = e.message
            }
        }
    }
}`}
        </CodeBlock>
      </Section>

      <Section id="conclusion" heading="Kesimpulan">
        <ul>
          <li>✅ Kotlin adalah first-class language untuk Android</li>
          <li>✅ Modern Android development dengan Jetpack libraries</li>
          <li>✅ Jetpack Compose untuk declarative UI</li>
          <li>✅ Coroutines untuk asynchronous operations</li>
          <li>✅ Room untuk local database</li>
        </ul>

        <Note type="success">
          Final materi: <strong>Best Practices</strong> - Kotlin coding conventions dan best practices.
        </Note>
      </Section>
    </MateriLayout>
  );
}
