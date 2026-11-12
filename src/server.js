const express = require('express');
const cors = require('cors');

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (_request, response) => {
  response.json({ ok: true, service: 'backend-pomodoro' });
});

function buildAssistantReply(message, context = {}) {
  const text = String(message || '').trim().toLowerCase();
  const sessions = Number(context.sessions) || 0;
  const minutes = Number(context.minutes) || 0;

  if (!text) {
    return 'Escribe una pregunta sobre tu sesión Pomodoro, tus descansos o tu progreso.';
  }
  if (text.includes('hola') || text.includes('buenas')) {
    return 'Hola. Soy Focus, tu asistente de Pomodoro. Puedo ayudarte a organizar tu siguiente sesión.';
  }
  if (text.includes('descanso') || text.includes('break')) {
    return 'Después de 25 minutos de enfoque, toma 5 minutos de descanso. Después de cuatro sesiones, haz una pausa larga de 15 a 30 minutos.';
  }
  if (text.includes('concentr') || text.includes('enfoc')) {
    return 'Elige una sola tarea, silencia las notificaciones y define un resultado pequeño para estos 25 minutos.';
  }
  if (text.includes('progreso') || text.includes('estad')) {
    return `Llevas ${sessions} sesión${sessions === 1 ? '' : 'es'} y ${minutes} minutos de enfoque. Cada bloque cuenta.`;
  }
  if (text.includes('tiempo') || text.includes('pomodoro')) {
    return 'Un Pomodoro estándar dura 25 minutos de enfoque y 5 minutos de descanso. Empieza por la tarea más importante.';
  }
  return 'Te recomiendo dividir esa tarea en un bloque de 25 minutos. Cuando termine, revisa lo logrado y decide si necesitas otro bloque.';
}

app.post('/api/chat', (request, response) => {
  const { message, context } = request.body || {};
  if (typeof message !== 'string') {
    return response.status(400).json({ error: 'message debe ser un texto' });
  }
  return response.json({ reply: buildAssistantReply(message, context) });
});

app.listen(port, () => {
  console.log(`Backend Pomodoro escuchando en http://localhost:${port}`);
});
