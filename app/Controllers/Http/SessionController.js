'use strict'

class SessionController {
    async store({ request, auth }) {
        const { name, email, password } = request.only([
            'name',
            'email',
            'password'
        ]);

        const { token } = await auth.attempt(email, password);

        return { token };

    }
}

module.exports = SessionController
