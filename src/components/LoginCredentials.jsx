export function LoginCredentials({ values }) {
    const delay = (0.7 + Math.random() * 2) * 1000;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (values.password === 'penumalla@123' && values.email === 'penumalla@tnfb.com') {
                resolve()
            } else {
                reject(new Error('Invalid credentials'))
            }
        }, delay)
    })
}