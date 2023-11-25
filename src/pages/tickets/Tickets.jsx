import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreateTicketAsync, actionGetTicketsAsync, actionUpdateTicketAsync } from '../../redux/actions/ticketsActions';
import './tickets.scss';
import NestedModal from '../../components/nestedModal/NestedModal';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Select, MenuItem } from '@mui/material';
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import axios from 'axios';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { getTickets } from '../../services/getTickets';
import { editTicket } from '../../services/createBuyerTicket';
import { updateStatusReserved } from '../../services/updateStatusReserved';
import client from '../../sanity/client';
import { SanityClient } from '@sanity/client';



const fileList = [];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal({ onClose }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    onClose(); // Call the provided onClose function to close the parent modal
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id='child-modal-title'>Text in a child modal</h2>
          <p id='child-modal-description'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const Tickets = ({ openNestedModal, setOpenNestedModal }) => {
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [selectedObjetId, setSelectedObjetId] = useState(null);
  const dispatch = useDispatch();
 // const { tickets } = useSelector((store) => store.tickets);
  // console.log(tickets);

  // const handleGenerateTickets = async () => {
  //   console.log("Generating tickets...");
  //   try {

  //     dispatch(generateTickets(999)); // Llamamos a generateTickets con el parámetro count
  //     console.log("Tickets generated successfully!");
  //   } catch (error) {
  //     console.error("Error generating tickets:", error);
  //   }
  // };

  // const generateTickets = async (count) => {
  //   for (let i = 2; i <= count + 1; i++) {
  //     const ticketNumber = String(i).padStart(3, "0"); // Custom ticket number, like '001', '002', ...
  //     const newTicketData = {
  //       status: "Disponible",
  //       ticketNumber: ticketNumber, // Use the custom ticket number
  //     };

  //     console.log("Creating ticket:", newTicketData);

  //     try {
  //       dispatch(actionCreateTicketAsync(newTicketData));
  //       console.log("Ticket created:", newTicketData);
  //     } catch (error) {
  //       console.error("Error creating ticket:", error);
  //     }
  //   }
  // };


  // useEffect(() => {
  //   dispatch(actionGetTicketsAsync());



  // }, [dispatch]);

  const [ticketsList, setTicketsList] = useState([])

  // useEffect(() => {
  //   getTickets().then((response) => {
  //     // console.log(response);
  //     setTicketsList(response);
  //   })
  // }, [])
  // console.log(ticketsList);

  // const client = SanityClient({
  //   projectId: 'xuu9wici',
  //   dataset: 'production',
  //   token: 'skFXcGr3cn9y8dmw2Pt6r0KXbnElxsgRcOCchc1tnEtJ1KgQHFJxGkDCIQQw0lTxTz3ewuHSXfcNUMcEoIcqpCVF2o9aQQW3luMhsup8cDpk7pPdAqXtQL57mU26w9QaRwg0au7ezAavcz45jPKpWWuUmhDErla0XpugwAHQxeSDHbHcI5mV', // Reemplaza con tu token
  //   useCdn: false, // Desactiva el uso de CDN si es necesario
  // });

  const tokenWithWriteAccess = 'skFXcGr3cn9y8dmw2Pt6r0KXbnElxsgRcOCchc1tnEtJ1KgQHFJxGkDCIQQw0lTxTz3ewuHSXfcNUMcEoIcqpCVF2o9aQQW3luMhsup8cDpk7pPdAqXtQL57mU26w9QaRwg0au7ezAavcz45jPKpWWuUmhDErla0XpugwAHQxeSDHbHcI5mV';
const projectId = 'xuu9wici';
const datasetName = 'production';

// const mutation = `
//   mutation {
//     createTicket(data: {
//       id:"001",
//       status: "Disponible"  // Valores de los campos según tu esquema
//     }) {
//       _id
//       status
//       # Agrega más campos según tu esquema
//     }
//   }
// `;

// fetch(`https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${datasetName}`, {
//   method: 'post',
//   headers: {
//     'Content-type': 'application/json',
//     Authorization: `Bearer ${tokenWithWriteAccess}`
//   },
//   body: JSON.stringify({ query: mutation })
// })
//   .then(response => response.json())
//   .then(result => console.log(result))
//   .catch(error => console.error(error));
 

  useEffect(() => {
    client
      .fetch(
        `*[_type == "Tickets"] {
        id,
        status,
      }`
      )
      .then((data) => {
        console.log(data);
        setTicketsList(data)
        })
      .catch(console.error);
  }, []);

  const createNewTicket = (ticketId, newStatus) => {
    
    const mutations = [
      {
        create: {
          _type: 'Tickets',
            id: ticketId,
            status: newStatus
            // Agrega más campos según tu esquema
          }
      }
    ];
    
    fetch(`https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${datasetName}`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${tokenWithWriteAccess}`
      },
      body: JSON.stringify({ mutations })
    })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.error(error));
    
    // const newTicket = {
    //   type: "Ticket",
    //   id: "001",
    //   status: "Disponiible", // Ajusta esto según tus necesidades
    //   // Agrega otros campos según el esquema de tu Ticket
    // };

    // client
    //   .create(newTicket)
    //   .then((response) => {
    //     console.log("Nuevo ticket creado:", response);
    //     // Actualiza la lista de tickets si es necesario
    //     setTicketsList((prevTickets) => [...prevTickets, response]);
    //   })
    //   .catch((error) => {
    //     console.error("Error al crear el nuevo ticket:", error);
    //   });
  };
  const createNewTickets = () => {
    const mutations = [];
  
    for (let i = 0; i <= 999; i++) {
      const ticketNumber = String(i).padStart(3, "0"); // Formatea el número como "001", "002", ...
      
      mutations.push({
        create: {
          _type: 'Tickets',
            id: ticketNumber,
            status: 'Disponible'
            // Agrega más campos según tu esquema
          }
      });
    }
  
    fetch(`https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${datasetName}`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${tokenWithWriteAccess}`
      },
      body: JSON.stringify({ mutations })
    })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.error(error));
  };


  //****************CREAR BUYER**************************//
  const createBuyer = async (buyerInfo) => {
    const newBuyer = {
      _type: "Buyer",
      name: buyerInfo.name,
      lastname: buyerInfo.lastName,
      cellphone: buyerInfo.cellphone,
      email: buyerInfo.email,
      imagePay: buyerInfo.imagePay,
      ticketId: buyerInfo.ticketId // Utiliza buyerInfo en lugar de selectedTicketId
    };
  
    const mutation = {
      mutations: [
        {
          create: newBuyer
        }
      ]
    };
  
    try {
      const response = await fetch(`https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${datasetName}`, {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${tokenWithWriteAccess}`
        },
        body: JSON.stringify(mutation)
      });
  
      const result = await response.json();
      console.log("Nuevo comprador creado:", result);
    } catch (error) {
      console.error("Error al crear el nuevo comprador:", error);
    }
  };
  
  // const createBuyer = async (buyerInfo) => {
  //   const newBuyer = {
  //     _type: "Buyer",
  //     name: buyerInfo.name,
  //     lastname: buyerInfo.lastName,
  //     cellphone: buyerInfo.cellphone,
  //     email: buyerInfo.email,
  //     imagePay: buyerInfo.imagePay,
  //     ticketId: selectedTicketId
  //   };
  
  //   try {
  //     const response = await client.create(newBuyer);
  //     console.log("Nuevo comprador creado:", response);
  //     // Actualiza la lista de compradores si es necesario
  //     //setBuyersList((prevBuyers) => [...prevBuyers, response]);
  //   } catch (error) {
  //     console.error("Error al crear el nuevo comprador:", error);
  //   }
  // };


  const getStatusClassName = (status) => {
    switch (status) {
      case 'Disponible':
        return 'ticket__available';
      case 'Reservado':
        return 'ticket__reserved';
      case 'Comprado':
        return 'ticket__purchased';
      default:
        return 'ticket__default';
    }
  };


  const openModal = (ticketId, ticketStatus, objetId) => {
    if (ticketStatus === 'Disponible') {
      setSelectedTicketId(ticketId);
      setSelectedObjetId(objetId)
      setOpenNestedModal(true);
    }
  };

  const initialValues = {
    name: '',
    lastName: '',
    email: '',
    cellphone: '',
    imagePay: '',
  };

  const [reserveAndSendWhatsapp, setReserveAndSendWhatsapp] = useState(false);

  // const handleEditTicket = () => {
  //   const selectedId = "029"
  //   const newData = 
  //   {
  //     status: "Disponible",
  //     id: selectedId
  //   }
  //   // {
  //   //   name: "Maria",
  //   //   lastName: "Pereira Leal",
  //   //   email: "",
  //   //   cellphone: "3173982019",
  //   //   imagePay: "",
  //   //   ticketNumber: "002",
  //   //   reserveAndSendWhatsapp: true,
  //   //   status: "Comprado",
  //   //   id: "002"
  //   // }
  //   editTicket(selectedId, newData);
  // }
  

  // const updateTicketStatus = async (ticketId, newStatus) => {
  //   const mutation = {
  //     mutations: [
  //       {
  //         patch: {
  //           id: ticketId,
  //           set: {
  //             status: newStatus
  //           }
  //         }
  //       }
  //     ]
  //   };
  
  //   try {
  //     const response = await fetch(`https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${datasetName}`, {
  //       method: 'post',
  //       headers: {
  //         'Content-type': 'application/json',
  //         Authorization: `Bearer ${tokenWithWriteAccess}`
  //       },
  //       body: JSON.stringify(mutation)
  //     });
  
  //     const result = await response.json();
  //     console.log(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const updateTicketStatus = async (ticketId, newStatus) => {
    const mutation = {
      mutations: [
        {
          patch: {
            id: ticketId,
            set: {
              status: newStatus
            }
          }
        }
      ]
    };
  
    try {
      const response = await fetch(`https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${datasetName}`, {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${tokenWithWriteAccess}`
        },
        body: JSON.stringify(mutation)
      });
  
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  

//   const testTicketId = "001"; // ID del ticket que deseas actualizar

// // Luego llama a tu función de actualización con el ID de prueba
//  updateTicketStatus(testTicketId, "Reservado")
//   .then(() => {
//     console.log("Actualización exitosa");
//   })
//   .catch((error) => {
//     console.error("Error en la actualización:", error);
//   });

const deleteTicket = async (ticketId) => {
  try {
    const response = await fetch(`https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${datasetName}`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${tokenWithWriteAccess}`
      },
      body: JSON.stringify({
        mutations: [
          {
            delete: {
              id: ticketId
            }
          }
        ]
      })
    });

    const result = await response.json();
    console.log(result);

    if (result.transactionId) {
      console.log(`Ticket with ID ${ticketId} deleted successfully.`);
    } else {
      console.log(`Failed to delete ticket with ID ${ticketId}.`);
    }
  } catch (error) {
    console.error(error);
  }
};




  const sendForm = async (data, selectedTicketId) => {
    console.log(typeof(selectedTicketId))
    const buyerInfo = {
      name: data.name,
      lastName: data.lastName,
      cellphone: data.cellphone,
      email: data.email,
      imagePay: avatar,
      ticketId: selectedTicketId
    };

      if (buyerInfo.imagePay === "" && reserveAndSendWhatsapp) {
       // const newData = {  ...buyerInfo };
      await createBuyer(buyerInfo); 
      deleteTicket(selectedTicketId);
      createNewTicket(selectedTicketId, 'Reservado');
      
     //  await updateTicketStatus(selectedTicketId, 'Reservado');
       // await updateTicketStatus(Number(selectedTicketId), "Comprado")
        // await editTicket(newData)
       // console.log(Number(selectedObjetId));
        // .then(() => {
        //   const idToUpdate = {
        //     "status": {
        //       "id": 2,
        //       "status": "Reservado"
        //     }
        //   }
        //   updateStatusReserved( Number(selectedObjetId), idToUpdate)
        // });
        setOpenNestedModal(false);
        Swal.fire(
          `Muchas gracias por tu reserva del N°${selectedTicketId}!`,
          'Al realizar el pago puedes adjuntar el comprobante al chat!',
          'success'
        )
        .then(() => {
    window.location.reload();
  });
      } else if (buyerInfo.imagePay !== "" && !reserveAndSendWhatsapp) {
        //const newData = { ...buyerInfo};
        await createBuyer(buyerInfo); 
        await deleteTicket(selectedTicketId);
        createNewTicket(selectedTicketId, 'Comprado');
        //await updateTicketStatus(selectedTicketId, 'Comprado');
        
        // await editTicket(newData);
        setOpenNestedModal(false);
        Swal.fire(
          'Muchas gracias por tu compra!',
          `Tu ticket N° ${selectedTicketId} ha sido confirmado!`,
          'success'
        )
        .then(() => {
          window.location.reload(); 
        });
      }
  };
  
  
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string()
      .matches(/^[a-zA-ZáÁéÉíÍóÓúÚñÑ\s]+$/, 'El nombre debe contener solo letras y espacios')
        .min(2, 'El nombre debe tener al menos 2 caracteres.')
        .max(20, 'El nombre no debe tener más de 20 caracteres.')
        .required('El nombre es obligatorio.'),  
      lastName: Yup.string()
      .matches(/^[a-zA-ZáÁéÉíÍóÓúÚñÑ\s]+$/, 'El Apellido debe contener solo letras y espacios')
        .min(2, 'El apellido debe tener al menos 2 caracteres.')
        .max(20, 'El apellido no debe tener más de 20 caracteres.')
        .required('El apellido es obligatorio.'),  
      cellphone: Yup.string()
        .matches(/^[0-9]+$/, 'El número de teléfono debe contener solo números')
        .min(7, 'El número de teléfono debe tener al menos 7 dígitos.')
        .required('El número de teléfono es obligatorio.'),
    }),
    onSubmit: (values) => sendForm(values, selectedTicketId),
  });
  

  const handleImageChange = (info) => {
    if (info.file.status === 'done') {
      const avatarUrlData = info.file.response.url;
      formik.setFieldValue('imagePay', avatarUrlData);
    }
  };

  const [avatar, setAvatar] = useState('');

  const handleBeforeUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'enxcq2td');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dd8l8bm6q/image/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // console.log(response.data);
      // console.log(response.data.url);

      const avatarUrlData = response.data.url;
      setAvatar(avatarUrlData);
    } catch (error) {
      console.log('Error:', error);
    }

    return false;
  };

// Copia el array original antes de ordenar para evitar modificarlo directamente
const sortedTicketsList = [...ticketsList];

// Ordena el array basado en los valores numéricos de ticketNumber
sortedTicketsList.sort((a, b) => {
  const numA = parseInt(a.id, 10);
  const numB = parseInt(b.id, 10);

  return numA - numB;
});

  return (
    <div>
     {/* <Button style={{backgroundColor:'red'}} onClick={handleGenerateTickets}>Generate 1000 Tickets</Button> */}
     {/* <button onClick={createNewTickets}>Crear Nuevo Ticket</button> */}
      <main className='ticket__main'>

        {sortedTicketsList &&
          sortedTicketsList.map((ticket) => (
            <div
              className={`ticket__div ${getStatusClassName(ticket.status)}`}
              key={ticket.id}
              onClick={() => openModal(ticket.id, ticket.status, ticket.id)}
            >
              <p className='ticket__id'> {ticket.id}</p>
              <p className='ticket__p'> {ticket.status} </p>
            </div>
          ))}
        {openNestedModal && (
          <NestedModal onClose={() => setOpenNestedModal(false)} />
        )}
      </main>

      <Modal
        open={openNestedModal}
        onClose={() => {
          setSelectedTicketId(null);
          setOpenNestedModal(false);
        }}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 400 }}>
          <span style={{ display: 'flex', justifyContent: 'end', fontSize: '1.5rem', color: '#540375', marginTop:'1rem' }}>
            <AiOutlineCloseCircle onClick={() => setOpenNestedModal(false)} />
          </span>
          <h2 id='parent-modal-title'>
            Has seleccionado el número {selectedTicketId}
          </h2>
          <p className='form__subtitle'>Por favor ingresa tus datos de contacto</p>
          <p id='parent-modal-description'>
            <form onSubmit={formik.handleSubmit} className='form__buyTicket'>
              <TextField
                id='outlined-password-input'
                label='Nombre'
                name='name'
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.errors.name}
                helperText={formik.errors.name}
              />
              <TextField
                id='outlined-password-input'
                label='Apellido'
                name='lastName'
                onChange={formik.handleChange}
                value={formik.values.lastName}
                error={formik.errors.lastName}
                helperText={formik.errors.lastName}
              />
              <TextField
                label='Número de celular'
                name='cellphone'
                onChange={formik.handleChange}
                value={formik.values.cellphone}
                error={formik.errors.cellphone}
                helperText={formik.errors.cellphone}
              />
              <TextField
                label='Correo electrónico'
                name='email'
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
                helperText={formik.errors.email}
              />
              <Upload
                name='file'
                action='https://api.cloudinary.com/v1_1/dd8l8bm6q/image/upload'
                listType='picture'
                defaultFileList={[...fileList]}
                onChange={handleImageChange}
                beforeUpload={handleBeforeUpload}
              >
                <Button
                  icon={<UploadOutlined style={{ border: '1px solid red' }} />}
                  className='form__uploadImage'
                >
                  Adjuntar imagen de comprobante de pago
                </Button>
              </Upload>

              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={reserveAndSendWhatsapp} onChange={() => setReserveAndSendWhatsapp(!reserveAndSendWhatsapp)} />}
                  label="Solo reservar y enviar comprobante a whatsapp"
                />
              </FormGroup>

              <Button type='submit' className='form__btn'>
                Continuar
              </Button>
            </form>
          </p>
          {/* <ChildModal onClose={() => setOpenNestedModal(false)} /> */}
        </Box>
      </Modal>
    </div>
  );
};

export default Tickets;
