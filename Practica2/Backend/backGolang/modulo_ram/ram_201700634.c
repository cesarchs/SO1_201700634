#include <linux/module.h>

// para usar KERN_INFO
#include <linux/kernel.h>

// Header para los macros module_init y module_exit
#include <linux/init.h>

// Header necesario porque se usara proc_fs
#include <linux/proc_fs.h>

/* for copy_from_user */
#include <linux/uaccess.h>

/* Header para usar la lib seq_file y manejar el archivo en /proc*/
#include <linux/seq_file.h>

// guns of the patriots
#include <linux/sysinfo.h>

//etc.... para q jale sys/sysinfo en kernel TuT
#include <linux/fs.h>
#include <linux/hugetlb.h>
#include <linux/mm.h>


struct sysinfo sysi;//usara sysinfo

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Modulo Memoria RAM");
MODULE_AUTHOR("Cesar Chamale");

// Funcion que se ejecutara cada vez que se lea el archivo con el comando CAT
static int escribir_archivo(struct seq_file *archivo, void *v)
{

    si_meminfo(&sysi); //"inicializador" datos del sysinfo
    #define K(x) ((x) << (PAGE_SHIFT - 10))//darle el formato de mb a los datos obtenidos sino F
    int ram_porc = ((K(sysi.totalram) - K(sysi.freeram)) * 100) / K(sysi.totalram);
    seq_printf(archivo, "{\"porcentaje\":%d}\n", ram_porc);
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
    proc_create("ram_201700634", 0, NULL, &operaciones);
    printk(KERN_INFO "201700634\n");// mensaje inicio
    return 0;
}

// Funcion a ejecuta al remover el modulo del kernel con rmmod
static void _remove(void)
{
    remove_proc_entry("ram_201700634", NULL);
    printk(KERN_INFO "Sistemas Operativos 1\n"); // mensaje despedida
}

module_init(_insert);
module_exit(_remove);