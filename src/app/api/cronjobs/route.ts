import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { cookies } from "next/headers";
import horarios from "@/models/horarios";
import mapa from "@/models/mapa";
connectDB();
const jwtName = process.env.JWT_NAME;
export async function POST(request: any) {
    
    const {contraseña} = await request.json();
    
           if(contraseña == process.env.PASSWORD){
      try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to start of the day

      // Convertir la fecha de hoy a una cadena en formato 'dd/mm/yyyy'
      const todayString = today.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      // Eliminar todos los horarios con la fecha de hoy
      const deleteResult = await horarios.deleteMany({ fecha: todayString });

       // Log de las fechas eliminadas
      if (deleteResult.deletedCount > 0) {
        console.log(`Fechas eliminadas: ${todayString}`);
      } else {
        console.log(`No se encontraron registros para eliminar en la fecha: ${todayString}`);
      }

      // Verificar si se eliminaron registros
      if (deleteResult.deletedCount > 0) {
        // Obtener todos los mapas existentes
        const mapas = await mapa.find();

        for (const mapa of mapas) {
          if (mapa.recorridos && mapa.recorridos.length > 0) {
            // Establecer la fecha 28 días después de hoy
            const futureDate = new Date(today);
            futureDate.setDate(futureDate.getDate() + 28);
            const futureDateString = futureDate.toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            });

            // Crear nuevos horarios basados en el horario por defecto de cada mapa
            const hor4weeks = mapa.recorridos.map((recorrido: { index: any; nombre: any; defaultHora: any[]; }) => ({
              index: recorrido.index,
              nombre: recorrido.nombre,
              defaultHora: recorrido.defaultHora.map((hora: any) => ({
                ...hora,
                fecha: futureDateString, // Establecer la fecha 28 días después de hoy
              })),
            }));

            const newHorario = {
              linea: mapa.linea,
              ruta: mapa.ruta,
              recorrido: mapa._id,
              fecha: futureDateString, // Establecer la fecha 28 días después de hoy
              hor4weeks,
            };

            // Insertar el nuevo horario en la base de datos
            await horarios.insertMany(newHorario);
            
            // Log de las fechas añadidas
            console.log(`Fecha añadida para el mapa ${mapa.nombre}: ${futureDateString}`);
          }
        }

        return NextResponse.json({ message: 'Horarios actualizados correctamente' });
      } else {
        return NextResponse.json({ message: 'No se encontraron registros para eliminar' }, { status: 404 });
      }
    } catch (error) {
      console.error('Error al actualizar los horarios:', error);
      return NextResponse.json({ message: 'Error al actualizar los horarios' }, { status: 500 });
    }
           }else{
                return NextResponse.json('error');
           }
   
}
