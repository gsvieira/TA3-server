const { test, trait } = use('Test/Suite')('sessions')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')*/
const User = use('App/models/User');

trait('Test/ApiClient')

test('return a token JWT when session created', async ({assert, client}) => {
    const user = await  User.create({
        name: 'gabriel',
        email: 'gsvieira98@gmail.com',
        password: '123456'
    });

    const response = await client
    .post('/sessions')
    .send({
        email: 'gsvieira98@gmail.com',
        password: '123456'
    })
    .end()

    console.log(response);
    
    response.assertStatus(200);

    assert.exists(response.body.token)


})