import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
const users = []

app.get('/', (c) => {
  return c.text('API is running')
})
app.get('/users', (c) => {
  return c.json(users)
})
app.get('/users/:id', (c) => {
  const id = c.req.param('id')

  const user = users.find(u => u.id === id)

  if (!user) {
    return c.json({ message: "User not found" }, 404)
  }

  return c.json(user)
})
app.post('/signup', async (c) => {
  const body = await c.req.json()

  const newUser = {
    id: Date.now().toString(),
    name: body.name,
    email: body.email,
    password: body.password
  }

  users.push(newUser)

  return c.json(newUser)
})
app.post('/signin', async (c) => {
  const body = await c.req.json()

  const user = users.find(u => u.email === body.email)

  if (!user) {
    return c.json({ message: "User not found" }, 404)
  }

  if (user.password !== body.password) {
    return c.json({ message: "Invalid password" }, 401)
  }

  return c.json({
    message: "Login successful",
    user
  })
})

serve({
  fetch: app.fetch,
  port: 3000
})
