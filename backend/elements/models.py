from django.db import models


class Element(models.Model):
    atomic_number = models.IntegerField(unique=True, primary_key=True)
    symbol = models.CharField(max_length=3)
    name = models.CharField(max_length=100)
    atomic_mass = models.FloatField(null=True, blank=True)
    group = models.IntegerField(null=True, blank=True)
    period = models.IntegerField(null=True, blank=True)
    block = models.CharField(max_length=1, null=True, blank=True)
    category = models.CharField(max_length=100, null=True, blank=True)
    color = models.CharField(max_length=7, default='#E0E0E0')
    
    # Atomic Properties
    protons = models.IntegerField(null=True, blank=True)
    neutrons = models.IntegerField(null=True, blank=True)
    electrons = models.IntegerField(null=True, blank=True)
    isotopes = models.JSONField(default=list, blank=True)
    
    # Electronic Properties
    electron_configuration = models.CharField(max_length=200, null=True, blank=True)
    valence_electrons = models.IntegerField(null=True, blank=True)
    oxidation_states = models.JSONField(default=list, blank=True)
    ionization_energy = models.FloatField(null=True, blank=True)
    electron_affinity = models.FloatField(null=True, blank=True)
    electronegativity = models.FloatField(null=True, blank=True)
    
    # Periodic Properties
    atomic_radius = models.FloatField(null=True, blank=True)
    ionic_radius = models.FloatField(null=True, blank=True)
    shielding_effect = models.CharField(max_length=20, null=True, blank=True)
    
    # Physical Properties
    state_at_room_temp = models.CharField(max_length=20, null=True, blank=True)
    color_appearance = models.CharField(max_length=100, null=True, blank=True)
    density = models.FloatField(null=True, blank=True)
    melting_point = models.FloatField(null=True, blank=True)
    boiling_point = models.FloatField(null=True, blank=True)
    electrical_conductivity = models.CharField(max_length=20, null=True, blank=True)
    thermal_conductivity = models.CharField(max_length=20, null=True, blank=True)
    hardness = models.CharField(max_length=50, null=True, blank=True)
    malleability = models.BooleanField(null=True, blank=True)
    ductility = models.BooleanField(null=True, blank=True)
    magnetic_properties = models.CharField(max_length=50, null=True, blank=True)
    
    # Chemical Properties
    reactivity = models.CharField(max_length=50, null=True, blank=True)
    bond_types = models.JSONField(default=list, blank=True)
    acidity_basicity = models.CharField(max_length=50, null=True, blank=True)
    corrosion_behavior = models.CharField(max_length=200, null=True, blank=True)
    combustion_behavior = models.CharField(max_length=200, null=True, blank=True)
    
    # Nuclear Properties
    radioactivity = models.CharField(max_length=50, null=True, blank=True)
    half_life = models.CharField(max_length=100, null=True, blank=True)
    nuclear_spin = models.CharField(max_length=20, null=True, blank=True)
    
    # Structural Properties
    crystal_structure = models.CharField(max_length=50, null=True, blank=True)
    lattice_parameters = models.CharField(max_length=200, null=True, blank=True)
    coordination_number = models.IntegerField(null=True, blank=True)
    
    # Thermodynamic Properties
    enthalpy_formation = models.FloatField(null=True, blank=True)
    entropy = models.FloatField(null=True, blank=True)
    heat_capacity = models.FloatField(null=True, blank=True)
    
    # Optical Properties
    emission_spectrum = models.CharField(max_length=200, null=True, blank=True)
    refractive_index = models.FloatField(null=True, blank=True)
    
    # Biological Properties
    biological_role = models.CharField(max_length=50, null=True, blank=True)
    toxicity = models.CharField(max_length=50, null=True, blank=True)
    abundance = models.CharField(max_length=200, null=True, blank=True)
    
    # Classification
    natural_or_synthetic = models.CharField(max_length=20, null=True, blank=True)
    
    def __str__(self):
        return f"{self.atomic_number}. {self.name} ({self.symbol})"
    
    class Meta:
        ordering = ['atomic_number']