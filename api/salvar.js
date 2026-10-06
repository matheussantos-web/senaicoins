export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ erro: 'Método não permitido' });
    }

    const { senhaDigitada, bucket, key, value } = req.body;
    const senhaSecretaDoVercel = process.env.ADMIN_AUTH; // Pega o .env do Vercel com segurança

    // Valida se a senha digitada bate com o .env do Vercel
    if (!senhaDigitada || senhaDigitada !== senhaSecretaDoVercel) {
        return res.status(401).json({ erro: 'Senha de Admin incorreta!' });
    }

    try {
        // Se a senha estiver correta, o servidor faz a requisição para a API externa
        const respostaApi = await fetch('https://onlinestorage.you.tec.br/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'admin-auth': senhaSecretaDoVercel // Envia a senha real de forma segura
            },
            body: JSON.stringify({ bucket, key, value })
        });

        const dados = await respostaApi.json();
        return res.status(respostaApi.status).json(dados);
    } catch (erro) {
        return res.status(500).json({ erro: 'Erro ao comunicar com a API externa.' });
    }
}