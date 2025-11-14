# 🧠 PsicoCitas  
### Plataforma Web de Gestión de Citas para Psicólogos y Pacientes

PsicoCitas es una aplicación web desarrollada con **React**, diseñada para facilitar la gestión de citas psicológicas entre pacientes y psicólogos. Incluye agenda digital, notificaciones por correo mediante **EmailJS**, sistema de reintentos inteligente por usuario cuando no hay internet y muy pronto integración con **Supabase**.

---

## 🚀 Tecnologías utilizadas
React, EmailJS, JavaScript ES6, LocalStorage, HTML5/CSS3, Supabase (próxima integración)

---

## 📦 Instalación del proyecto (todo en un solo paso)

Clona el repositorio, entra al proyecto, instala dependencias, crea tu archivo .env y ejecuta:

```bash
git clone https://github.com/jefersonEspinoza29/Proyecto-Psicocitas.git && \
cd Proyecto-Psicocitas && \
npm install && \
cp .env.example .env && \
npm start

Sistema de Reintentos (Offline → Online)

PsicoCitas incluye un sistema robusto de reintentos por usuario:

Si el usuario pierde internet, los correos se guardan en
colaCorreos_emailUsuario.

Cada usuario (paciente o psicólogo) tiene su propia cola, evitando mezclar información.

Al volver la conexión, los correos se reenvían automáticamente.

Existe un botón para reenviar manualmente.

Totalmente aislado por cuenta, evitando errores entre usuarios.

👤 Roles del sistema
Paciente

Agenda citas con psicólogos.

Selecciona fechas y horarios disponibles.

Recibe notificaciones sobre cambios de estado.

Maneja su propia cola de reintentos.

Psicólogo

Revisa todas las citas recibidas.

Acepta, cancela o marca como atendida.

Envía notificaciones al paciente.

Administra su cola de reintentos independiente.

🧪 Próximas mejoras

Autenticación con Supabase Auth

Guardado real de citas y usuarios en Supabase

Dashboard profesional

Notificaciones push

Deploy en Vercel

👨‍💻 Autor

Jeferson Espinoza
GitHub: https://github.com/jefersonEspinoza29