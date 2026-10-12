import nodemailer from 'nodemailer';


export const enviarEmailCodigoAcesso = async (para: string, nomeCliente: string | undefined, codAcesso: string | undefined) => {
  try {
    // 1. Cria uma conta de testes falsa automaticamente pelo Nodemailer
    const testAccount = await nodemailer.createTestAccount();

    // 2. Configura o transportador usando essa conta temporária
    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // 3. Envia o e-mail normalmente
    const info = await transporter.sendMail({
      from: '"Minha Empresa" <no-reply@empresa.com>',
      to: para,
      subject: 'Seu código de acesso da Ordem',
      text: `Olá ${nomeCliente}, seu código de acesso é: ${codAcesso}`,
      html: `<h2>Olá, ${nomeCliente}!</h2><p>Seu código de acesso é: <b>${codAcesso}</b></p>`,
    });

    console.log('E-mail "enviado" com sucesso!');
    
    // 4. ESSA É A MÁGICA: Ele gera um link web para você visualizar o e-mail enviado
    console.log('Link para visualizar o e-mail:', nodemailer.getTestMessageUrl(info));

    return true;
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return false;
  }
};