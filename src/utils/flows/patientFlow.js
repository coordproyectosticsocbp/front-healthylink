import CreatePatientComponent from "@/components/patients/subComponents/CreatePatient/CreatePatientForm/CreatePatientComponent.vue";

export const patientFlow = [
    {
        icon: 'fas fa-user',
        name: 'Creación',
        title: 'Creación del Paciente',
        subtitle: 'Subtitle sample',
        component: CreatePatientComponent,
        completed: false

    },
    {
        icon: 'report_problem',
        name: 'second',
        title: 'Sample title 2',
        subtitle: 'Subtitle sample',
        component: CreatePatientComponent,
        completed: false
    }
]