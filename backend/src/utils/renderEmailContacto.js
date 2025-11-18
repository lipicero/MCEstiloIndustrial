const fs = require('fs');
const path = require('path');

function renderEmailContacto({ nombre, email, mensaje, fecha_hora, subject, telefono, lang = 'es' }) {
  const templatePath = path.join(__dirname, '../views/email_contacto.html');
  let html = fs.readFileSync(templatePath, 'utf8');

  // Simple HTML escaping for values injected into template
  function escapeHtml(text) {
    if (text === undefined || text === null) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  const nombreSafe = escapeHtml(nombre);
  const emailSafe = escapeHtml(email);
  const telefonoSafe = escapeHtml(telefono);
  // Preserve line breaks in message
  const mensajeSafe = escapeHtml(mensaje).replace(/\r?\n/g, '<br>');
  const fecha_horaSafe = escapeHtml(fecha_hora);
  const subjectSafe = escapeHtml(subject);
  const langSafe = escapeHtml(lang);

  html = html.replace(/{{nombre}}/g, nombreSafe)
    .replace(/{{email}}/g, emailSafe)
    .replace(/{{mensaje}}/g, mensajeSafe)
    .replace(/{{telefono}}/g, telefonoSafe)
    .replace(/{{fecha_hora}}/g, fecha_horaSafe)
    .replace(/{{subject}}/g, subjectSafe)
    .replace(/{{lang}}/g, langSafe);

  // Use the message text as mailto subject. Clean newlines, trim, and limit length.
  // Use the first line of the message for subject (clean and truncate)
  const rawSubjectSource = (typeof mensaje === 'string' && mensaje.trim().length > 0)
    ? mensaje.split(/\r?\n/)[0]
    : (typeof subject === 'string' ? subject : 'Contacto desde la web');
  const mailtoSubject = encodeURIComponent(rawSubjectSource.replace(/\r?\n/g, ' ').trim().slice(0, 120));
  // Include original message and some context in the body. Use CRLF newlines then encode once.
  const mailtoBodyText = `Mensaje recibido desde el formulario de contacto.\r\n\r\nNombre: ${nombre}\r\nEmail: ${email}\r\nTeléfono: ${telefono || ''}\r\nFecha: ${fecha_hora}\r\n\r\nMensaje:\r\n${mensaje}`;
  const mailtoBody = encodeURIComponent(mailtoBodyText);
  html = html.replace(/{{mailto_subject}}/g, mailtoSubject)
    .replace(/{{mailto_body}}/g, mailtoBody);
  return html;
}

module.exports = renderEmailContacto;
