#include <linux/module.h>

// para usar KERN_INFO
#include <linux/kernel.h>

// Header para los macros module_init y module_exit
#include <linux/init.h>

// Header necesario porque se usara proc_fs
#include <linux/proc_fs.h>

/* for copy_from_user */
#include <asm/uaccess.h>

/* Header para usar la lib seq_file y manejar el archivo en /proc*/
#include <linux/seq_file.h>

// guns of the patriots
//etc.... para q jale sched en kernel TuT
#include <linux/hugetlb.h>
// struct task_struct
#include <linux/sched.h>
// for_each_process
#include <linux/sched/signal.h> 


struct task_struct *procs,*subprocs;
struct list_head *list_hijos;


MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Modulo de CPU");
MODULE_AUTHOR("Cesar Chamale");

// Funcion que se ejecutara cada vez que se lea el archivo con el comando CAT

static int escribir_archivo(struct seq_file *archivo, void *v) {
    long memoria;//fijo porq es long lo q devuelve mm_rss

    int num_ele=0,num_ele2=0,running=0,inter=0,stop=0,zombie=0;
    seq_printf(archivo, "{ \"cpu\":[\n");
    for_each_process(procs) {
        if(procs->mm) {
            memoria = get_mm_rss(procs->mm);
        }
        if (num_ele==0){
            seq_printf(archivo, "{\n");//para el primer objeto
        }else{
             seq_printf(archivo, ",{\n");//para el 2ndo o mas
        }
        //escribo cada proceso padre
        seq_printf(archivo,"\"PID\": %d,\n\"Nombre\": \"%s\",\n\"Usuario\": %d,\n",procs->pid,procs->comm,procs->real_cred->uid);
        //<  >
        if(procs->__state==0){//tengo q filtrar para saber el tipo del proceso, pero solo 0 me da xd
            running++;
        }else if(procs->__state==1){
            inter++;
        }else if(procs->__state==128){
            stop++;
        }else if(procs->__state==260){
            zombie++;
        }
        seq_printf(archivo,"\"Estado\": %u,\n\"Ram\": %lu, \n",procs->__state,memoria/1024);
        seq_printf(archivo,"\t\"Hijos\":[");
        //con esto vamos a por los hijos-------------------------------
        list_for_each(list_hijos, &(procs->children)) {
            subprocs= list_entry(list_hijos, struct task_struct, sibling);
            if (num_ele2==0){//igual para escribir el 1
            seq_printf(archivo, "\t{\n");
            }else{//escribir al 2ndo o mas
            seq_printf(archivo, ",{\n");
            }
            seq_printf(archivo,"\t\t\"PID_hijo\": %d,\n\t\t\"Nombre_hijo\": \"%s\"\n",subprocs->pid,subprocs->comm);//hijo
            seq_printf(archivo, "\t\t}");
            num_ele2++;
        }
        //reinicio pues ya recorri todos los hijos
        num_ele2=0;
        seq_printf(archivo,"\t]\n");//cierro array hijos
        
        seq_printf(archivo, "}");//fin de mi proceso padre
        num_ele++;
    }
        seq_printf(archivo, "]\n,");
        seq_printf(archivo,"\"ejecucion\": %d,\n\"suspendidos\": %d,\n\"detenidos\": %d,\n\"zombie\": %d,\n\"uso\": 0\n}",running,inter,stop,zombie);

    return 0;
}

// Funcion que se ejecutara cada vez que se lea el archivo con el comando CAT
static int al_abrir(struct inode *inode, struct file *file)
{
    return single_open(file, escribir_archivo, NULL);
}

// Si el kernel es 5.6 o mayor se usa la estructura proc_ops
static struct proc_ops operaciones = 
{
    .proc_open = al_abrir,
    .proc_read = seq_read};

// Funcion a ejecuta al insertar el modulo en el kernel con insmod
static int _insert(void)
{
    proc_create("cpu_201700634", 0, NULL, &operaciones);
    printk(KERN_INFO "Cesar Leonel Chamale Sican\n");// mensaje inicio
    return 0;
}

// Funcion a ejecuta al remover el modulo del kernel con rmmod
static void _remove(void)
{
    remove_proc_entry("cpu_201700634", NULL);
    printk(KERN_INFO "Primero Semestre 2023\n"); // mensaje despedida
}

module_init(_insert);
module_exit(_remove);