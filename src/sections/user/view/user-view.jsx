import { useState, useEffect } from 'react';
import {
  Card,
  Container,
  Avatar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  Alert,
  Badge,
  Chip,
  Snackbar
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  LocationOn as LocationOnIcon,
  People as PeopleIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { 
  getEmployees, 
  updateEmployeeStatus,
  getEmployeeLocation,
  getNearbyEmployees
} from '../../../utils/employeeApi';
import Scrollbar from '../../../components/scrollbar';
import TableNoData from '../table-no-data';
import UserTableToolbar from '../user-table-toolbar';
import { applyFilter, getComparator } from '../utils';

export default function EmployeePage() {
  const [state, setState] = useState({
    filterName: '',
    anchorEl: null,
    selectedEmployee: null,
    employees: [],
    loading: true,
    error: null,
    notification: null,
    location: null,
    nearbyEmployees: [],
    retryCount: 0
  });

  const {
    filterName,
    anchorEl,
    selectedEmployee,
    employees,
    loading,
    error,
    notification,
    location,
    nearbyEmployees,
    retryCount
  } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        const apiEmployees = await getEmployees();
        console.log('API Response:', apiEmployees);
        
        if (!Array.isArray(apiEmployees)) {
          throw new Error('Format de données invalide reçu de l\'API');
        }
        
        const formattedEmployees = apiEmployees.map(employee => ({
          id: employee.id,
          name: `${employee.firstName} ${employee.lastName}`,
          avatarUrl: employee.photoUrl || '/assets/images/avatars/avatar_default.jpg',
          position: employee.position || 'Poste non spécifié',
          department: employee.department || 'Département non spécifié',
          email: employee.email,
          status: employee.isActive ? 'active' : 'inactive',
          phoneNumber: employee.phoneNumber
        }));
        
        setState(prev => ({
          ...prev,
          employees: formattedEmployees,
          loading: false
        }));
      } catch (err) {
        console.error('Fetch error:', err);
        if (retryCount < 3) {
          setTimeout(() => {
            setState(prev => ({ ...prev, retryCount: prev.retryCount + 1 }));
          }, 2000);
        } else {
          setState(prev => ({
            ...prev,
            error: err.message || 'Échec du chargement des employés',
            loading: false
          }));
        }
      }
    };

    fetchData();
  }, [retryCount]);

  const handleStateUpdate = (updates) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const handleFilterByName = (event) => {
    handleStateUpdate({ filterName: event.target.value });
  };

  const handleClickMenu = (event, employee) => {
    handleStateUpdate({
      selectedEmployee: employee,
      anchorEl: event.currentTarget,
      location: null,
      nearbyEmployees: []
    });
  };

  const handleCloseMenu = () => {
    handleStateUpdate({ anchorEl: null });
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await updateEmployeeStatus(selectedEmployee.id, newStatus === 'active');
      
      handleStateUpdate({
        employees: employees.map(emp => 
          emp.id === selectedEmployee.id ? { 
            ...emp, 
            status: newStatus 
          } : emp
        ),
        notification: {
          message: `Statut de ${selectedEmployee.name} mis à jour`,
          severity: 'success'
        }
      });
    } catch (err) {
      handleStateUpdate({
        notification: {
          message: err.message || 'Échec de la mise à jour',
          severity: 'error'
        }
      });
    } finally {
      handleCloseMenu();
    }
  };

  const handleViewLocation = async () => {
    try {
      const locationData = await getEmployeeLocation(selectedEmployee.id);
      handleStateUpdate({ location: locationData });
    } catch (err) {
      handleStateUpdate({
        notification: {
          message: err.message || 'Erreur de localisation',
          severity: 'error'
        }
      });
    }
  };

  const handleViewNearbyEmployees = async () => {
    try {
      const nearby = await getNearbyEmployees(selectedEmployee.id);
      handleStateUpdate({ nearbyEmployees: nearby });
    } catch (err) {
      handleStateUpdate({
        notification: {
          message: err.message || 'Erreur de proximité',
          severity: 'error'
        }
      });
    }
  };

  const handleCloseNotification = () => {
    handleStateUpdate({ notification: null });
  };

  const dataFiltered = applyFilter({
    inputData: employees,
    comparator: getComparator('asc', 'name'),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Bouton pour ajouter un employé */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button 
            component={Link}
            to="/user/add"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Ajouter un employé
          </Button>
        </Box>

        {/* Notification Snackbar */}
        <Snackbar
          open={!!notification}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseNotification} 
            severity={notification?.severity}
            sx={{ width: '100%' }}
          >
            {notification?.message}
          </Alert>
        </Snackbar>

        {/* Error Alert */}
        {error && (
          <Alert 
            severity="error"
            action={
              retryCount >= 3 && (
                <Button 
                  color="inherit" 
                  size="small" 
                  onClick={() => handleStateUpdate({ retryCount: 0, error: null })}
                >
                  Réessayer
                </Button>
              )
            }
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        )}

        <UserTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Message quand aucun employé n'existe dans le système */}
            {!loading && employees.length === 0 && !error && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Aucun employé trouvé dans le système
              </Alert>
            )}

            {/* Liste des employés */}
            <Scrollbar>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {dataFiltered.map((employee) => (
                  <Card key={employee.id} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <Box sx={{ 
                          bgcolor: employee.status === 'active' ? 'success.main' : 'error.main', 
                          width: 12, 
                          height: 12, 
                          borderRadius: '50%' 
                        }} />
                      }
                    >
                      <Avatar
                        src={employee.avatarUrl}
                        alt={employee.name}
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                    </Badge>
                    
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">
                        {employee.name}
                        <Chip
                          label={employee.status === 'active' ? 'Actif' : 'Inactif'}
                          size="small"
                          color={employee.status === 'active' ? 'success' : 'error'}
                          sx={{ ml: 1 }}
                        />
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary">
                        {employee.position} • {employee.department}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Button size="small" href={`mailto:${employee.email}`}>
                          Email
                        </Button>
                        {employee.phoneNumber && (
                          <Button size="small" href={`tel:${employee.phoneNumber}`}>
                            Appeler
                          </Button>
                        )}
                      </Box>
                    </Box>
                    
                    <IconButton onClick={(e) => handleClickMenu(e, employee)}>
                      <MoreVertIcon />
                    </IconButton>
                  </Card>
                ))}
              </Box>
            </Scrollbar>
          </>
        )}

        {notFound && <TableNoData query={filterName} />}

        {/* Employee Context Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          MenuListProps={{ sx: { minWidth: 250 } }}
        >
          <MenuItem onClick={() => handleStatusChange(selectedEmployee?.status === 'active' ? 'inactive' : 'active')}>
            {selectedEmployee?.status === 'active' ? 'Désactiver' : 'Activer'}
          </MenuItem>
          
          <MenuItem onClick={handleViewLocation}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ mr: 1, fontSize: 20 }} />
              Localisation
            </Box>
          </MenuItem>
          
          <MenuItem onClick={handleViewNearbyEmployees}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PeopleIcon sx={{ mr: 1, fontSize: 20 }} />
              Collègues proches
            </Box>
          </MenuItem>
          
          {location && (
            <MenuItem disabled sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="caption" color="text.secondary">
                Localisation actuelle:
              </Typography>
              <Typography variant="body2">
                {location.address || 'Non disponible'}
              </Typography>
              {location.coordinates && (
                <Typography variant="caption" color="text.secondary">
                  (Lat: {location.coordinates.lat}, Lng: {location.coordinates.lng})
                </Typography>
              )}
            </MenuItem>
          )}
          
          {nearbyEmployees.length > 0 && (
            <MenuItem disabled sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="caption" color="text.secondary">
                À proximité ({nearbyEmployees.length}):
              </Typography>
              {nearbyEmployees.slice(0, 3).map(emp => (
                <Typography key={emp.id} variant="body2">
                  • {emp.name} ({emp.distance}m)
                </Typography>
              ))}
              {nearbyEmployees.length > 3 && (
                <Typography variant="caption" color="text.secondary">
                  + {nearbyEmployees.length - 3} autres...
                </Typography>
              )}
            </MenuItem>
          )}
        </Menu>
      </Box>
    </Container>
  );
}